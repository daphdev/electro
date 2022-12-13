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
import { TransferResponse } from 'models/Transfer';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import TransferConfigs from 'pages/transfer/TransferConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';
import { ArrowNarrowRight } from 'tabler-icons-react';

function TransferManage() {
  useResetManagePageState();
  useInitFilterPanelState(TransferConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<TransferResponse>,
  } = useGetAllApi<TransferResponse>(TransferConfigs.resourceUrl, TransferConfigs.resourceKey);

  const { searchToken } = useAppStore();

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

  const showedPropertiesFragment = (entity: TransferResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>{entity.exportDocket.warehouse.name}</td>
      <td>{docketStatusBadgeFragment(entity.exportDocket.status)}</td>
      <td><ArrowNarrowRight size={18}/></td>
      <td>{entity.importDocket.warehouse.name}</td>
      <td>{docketStatusBadgeFragment(entity.importDocket.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: TransferResponse) => (
    <>
      <tr>
        <td>{TransferConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>Mã phiếu xuất</td>
        <td>{entity.exportDocket.code}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties['exportDocket.warehouse.name'].label}</td>
        <td>{entity.exportDocket.warehouse.name}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties['exportDocket.status'].label}</td>
        <td>{docketStatusBadgeFragment(entity.exportDocket.status)}</td>
      </tr>
      <tr>
        <td>Mã phiếu nhập</td>
        <td>{entity.importDocket.code}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties['importDocket.warehouse.name'].label}</td>
        <td>{entity.importDocket.warehouse.name}</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties['importDocket.status'].label}</td>
        <td>{docketStatusBadgeFragment(entity.importDocket.status)}</td>
      </tr>
      <tr>
        <td>Số mặt hàng</td>
        <td>{MiscUtils.formatPrice(entity.exportDocket.docketVariants.length)} SKU</td>
      </tr>
      <tr>
        <td>{TransferConfigs.properties.note.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={TransferConfigs.manageTitleLinks}
          title={TransferConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={TransferConfigs.resourceUrl}
          resourceKey={TransferConfigs.resourceKey}
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
          properties={TransferConfigs.properties}
          resourceUrl={TransferConfigs.resourceUrl}
          resourceKey={TransferConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default TransferManage;
