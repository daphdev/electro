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
import { DocketResponse } from 'models/Docket';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import DocketConfigs from 'pages/docket/DocketConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';

function DocketManage() {
  useResetManagePageState();
  useInitFilterPanelState(DocketConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<DocketResponse>,
  } = useGetAllApi<DocketResponse>(DocketConfigs.resourceUrl, DocketConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const docketTypeBadgeFragment = (type: number) => {
    switch (type) {
    case 1:
      return <Badge color="blue" variant="filled" size="sm">Nhập</Badge>;
    case 2:
      return <Badge color="orange" variant="filled" size="sm">Xuất</Badge>;
    }
  };

  const docketStatusBadgeFragment = (status: number) => {
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

  const showedPropertiesFragment = (entity: DocketResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>{docketTypeBadgeFragment(entity.type)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td style={{ textAlign: 'right' }}>
        {MiscUtils.formatPrice(entity.docketVariants.length)} SKU
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.reason.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.warehouse.name}
        </Highlight>
      </td>
      <td>{docketStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: DocketResponse) => (
    <>
      <tr>
        <td>{DocketConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.type.label}</td>
        <td>{docketTypeBadgeFragment(entity.type)}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.totalVariants.label}</td>
        <td>{MiscUtils.formatPrice(entity.docketVariants.length)} SKU</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties['reason.name'].label}</td>
        <td>{entity.reason.name}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties['warehouse.name'].label}</td>
        <td>{entity.warehouse.name}</td>
      </tr>
      <tr>
        <td>Mã đơn mua hàng</td>
        <td>{entity.purchaseOrder?.code}</td>
      </tr>
      <tr>
        <td>Mã đơn hàng</td>
        <td>{entity.order?.code}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.note.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>{DocketConfigs.properties.status.label}</td>
        <td>{docketStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={DocketConfigs.manageTitleLinks}
          title={DocketConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={DocketConfigs.resourceUrl}
          resourceKey={DocketConfigs.resourceKey}
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
          properties={DocketConfigs.properties}
          resourceUrl={DocketConfigs.resourceUrl}
          resourceKey={DocketConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default DocketManage;
