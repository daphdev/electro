import React from 'react';
import { Badge, Highlight, Stack } from '@mantine/core';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  ManageTable,
  SearchPanel
} from 'components';
import DateUtils from 'utils/DateUtils';
import { CountResponse } from 'models/Count';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CountConfigs from 'pages/count/CountConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';

function CountManage() {
  useResetManagePageState();
  useInitFilterPanelState(CountConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CountResponse>,
  } = useGetAllApi<CountResponse>(CountConfigs.resourceUrl, CountConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const countStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">Mới</Badge>;
    case 2:
      return <Badge color="blue" variant="outline" size="sm">Đang xử lý</Badge>;
    case 3:
      return <Badge color="green" variant="outline" size="sm">Hoàn thành</Badge>;
    case 4:
      return <Badge color="red" variant="outline" size="sm">Hủy bỏ</Badge>;
    }
  };

  const showedPropertiesFragment = (entity: CountResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td style={{ textAlign: 'right' }}>
        {MiscUtils.formatPrice(entity.countVariants.length)} SKU
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.warehouse.name}
        </Highlight>
      </td>
      <td>{countStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CountResponse) => (
    <>
      <tr>
        <td>{CountConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties['warehouse.name'].label}</td>
        <td>{entity.warehouse.name}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties.totalVariants.label}</td>
        <td>{MiscUtils.formatPrice(entity.countVariants.length)} SKU</td>
      </tr>
      <tr>
        <td>Ghi chú phiếu kiểm kho</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>{CountConfigs.properties.status.label}</td>
        <td>{countStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CountConfigs.manageTitleLinks}
          title={CountConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CountConfigs.resourceUrl}
          resourceKey={CountConfigs.resourceKey}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <ManageTable
          listResponse={listResponse}
          properties={CountConfigs.properties}
          resourceUrl={CountConfigs.resourceUrl}
          resourceKey={CountConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CountManage;
