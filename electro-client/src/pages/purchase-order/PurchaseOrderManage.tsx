import React from 'react';
import { ActionIcon, Badge, Highlight, Stack, Text } from '@mantine/core';
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
import { PurchaseOrderResponse } from 'models/PurchaseOrder';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import PurchaseOrderConfigs from 'pages/purchase-order/PurchaseOrderConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';
import { Plus } from 'tabler-icons-react';

function PurchaseOrderManage() {
  useResetManagePageState();
  useInitFilterPanelState(PurchaseOrderConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<PurchaseOrderResponse>,
  } = useGetAllApi<PurchaseOrderResponse>(PurchaseOrderConfigs.resourceUrl, PurchaseOrderConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const purchaseOrderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">Đơn hàng mới</Badge>;
    case 2:
      return <Badge color="yellow" variant="outline" size="sm">Đang chờ duyệt</Badge>;
    case 3:
      return <Badge color="violet" variant="outline" size="sm">Đã duyệt</Badge>;
    case 4:
      return <Badge color="blue" variant="outline" size="sm">Đang xử lý</Badge>;
    case 5:
      return <Badge color="green" variant="outline" size="sm">Hoàn thành</Badge>;
    case 6:
      return <Badge color="orange" variant="outline" size="sm">Không duyệt</Badge>;
    case 7:
      return <Badge color="red" variant="outline" size="sm">Hủy bỏ</Badge>;
    }
  };

  const showedPropertiesFragment = (entity: PurchaseOrderResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.supplier.displayName}
        </Highlight>
      </td>
      <td>
        <Stack spacing={0}>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.destination.address.line || ''}
          </Highlight>
          <Text inherit>
            {[entity.destination.address.district?.name, entity.destination.address.province?.name]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </Stack>
      </td>
      <td style={{ textAlign: 'right' }}>
        {MiscUtils.formatPrice(entity.totalAmount) + ' ₫'}
      </td>
      <td>
        <ActionIcon
          color="blue"
          variant="hover"
          size={24}
          title="Tạo phiếu nhập kho"
        >
          <Plus/>
        </ActionIcon>
      </td>
      <td>{purchaseOrderStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: PurchaseOrderResponse) => (
    <>
      <tr>
        <td>{PurchaseOrderConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties['supplier.displayName'].label}</td>
        <td>{entity.supplier.displayName}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties['destination.address.line'].label}</td>
        <td>
          <Stack spacing={0}>
            <Text inherit>{entity.destination.address.line}</Text>
            <Text inherit>
              {[entity.destination.address.district?.name, entity.destination.address.province?.name]
                .filter(Boolean)
                .join(', ')}
            </Text>
          </Stack>
        </td>
      </tr>
      <tr>
        <td>Người liên hệ điểm nhập hàng</td>
        <td>
          <Stack spacing={0}>
            {[entity.destination.contactFullname, entity.destination.contactPhone, entity.destination.contactEmail]
              .filter(Boolean)
              .map(item => <Text key={item} inherit>{item}</Text>)}
          </Stack>
        </td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.totalAmount.label}</td>
        <td>{MiscUtils.formatPrice(entity.totalAmount) + ' ₫'}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.note.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>{PurchaseOrderConfigs.properties.status.label}</td>
        <td>{purchaseOrderStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={PurchaseOrderConfigs.manageTitleLinks}
          title={PurchaseOrderConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={PurchaseOrderConfigs.resourceUrl}
          resourceKey={PurchaseOrderConfigs.resourceKey}
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
          properties={PurchaseOrderConfigs.properties}
          resourceUrl={PurchaseOrderConfigs.resourceUrl}
          resourceKey={PurchaseOrderConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default PurchaseOrderManage;
