import React from 'react';
import { ActionIcon, Badge, ColorSwatch, Group, Highlight, Stack, Text } from '@mantine/core';
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
import { OrderResponse } from 'models/Order';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import OrderConfigs from 'pages/order/OrderConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';
import { Plus } from 'tabler-icons-react';

function OrderManage() {
  useResetManagePageState();
  useInitFilterPanelState(OrderConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<OrderResponse>,
  } = useGetAllApi<OrderResponse>(OrderConfigs.resourceUrl, OrderConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const orderStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="gray" variant="outline" size="sm">Đơn hàng mới</Badge>;
    case 2:
      return <Badge color="blue" variant="outline" size="sm">Đang xử lý</Badge>;
    case 3:
      return <Badge color="violet" variant="outline" size="sm">Đang giao hàng</Badge>;
    case 4:
      return <Badge color="green" variant="outline" size="sm">Đã giao hàng</Badge>;
    case 5:
      return <Badge color="red" variant="outline" size="sm">Hủy bỏ</Badge>;
    }
  };

  const showedPropertiesFragment = (entity: OrderResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.orderResource.color}/>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.orderResource.name}
          </Highlight>
        </Group>
      </td>
      <td>
        <Stack spacing={0}>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.user.fullname}
          </Highlight>
          <Highlight highlight={searchToken} highlightColor="blue" size="xs" color="dimmed">
            {entity.user.username}
          </Highlight>
        </Stack>
      </td>
      <td>
        <Stack spacing={0}>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.toName}
          </Highlight>
          <Highlight highlight={searchToken} highlightColor="blue" size="xs" color="dimmed">
            {entity.toPhone}
          </Highlight>
          <Highlight highlight={searchToken} highlightColor="blue" size="xs" color="dimmed">
            {entity.toAddress}
          </Highlight>
          <Highlight highlight={searchToken} highlightColor="blue" size="xs" color="dimmed">
            {[entity.toWardName, entity.toDistrictName].join(', ')}
          </Highlight>
          <Highlight highlight={searchToken} highlightColor="blue" size="xs" color="dimmed">
            {entity.toProvinceName}
          </Highlight>
        </Stack>
      </td>
      <td style={{ textAlign: 'right' }}>
        {MiscUtils.formatPrice(entity.totalPay) + ' ₫'}
      </td>
      <td>
        <ActionIcon
          color="blue"
          variant="hover"
          size={24}
          title="Tạo phiếu xuất kho"
        >
          <Plus/>
        </ActionIcon>
      </td>
      <td>{orderStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: OrderResponse) => (
    <>
      <tr>
        <td>{OrderConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties.status.label}</td>
        <td>{orderStatusBadgeFragment(entity.status)}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties['orderResource.name'].label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.orderResource.color}/>
            {entity.orderResource.name}
          </Group>
        </td>
      </tr>
      <tr>
        <td>Tên lý do hủy đơn hàng</td>
        <td>{entity.orderCancellationReason?.name}</td>
      </tr>
      <tr>
        <td>Ghi chú đơn hàng</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>Người đặt hàng</td>
        <td>
          <Stack spacing={0}>
            <Text size="sm">{entity.user.fullname}</Text>
            <Text size="xs" color="dimmed">{entity.user.username}</Text>
          </Stack>
        </td>
      </tr>
      <tr>
        <td>Người nhận hàng</td>
        <td>
          <Stack spacing={0}>
            <Text size="sm">{entity.toName}</Text>
            <Text size="xs" color="dimmed">{entity.toPhone}</Text>
            <Text size="xs" color="dimmed">
              {[entity.toAddress, entity.toWardName, entity.toDistrictName, entity.toProvinceName].join(', ')}
            </Text>
          </Stack>
        </td>
      </tr>
      <tr>
        <td>Số mặt hàng</td>
        <td>{entity.orderVariants.length} SKU</td>
      </tr>
      <tr>
        <td>Tổng thành tiền</td>
        <td>{MiscUtils.formatPrice(entity.totalAmount) + ' ₫'}</td>
      </tr>
      <tr>
        <td>Thuế</td>
        <td>{entity.tax * 100 + '%'}</td>
      </tr>
      <tr>
        <td>Phí vận chuyển</td>
        <td>{MiscUtils.formatPrice(entity.shippingCost) + ' ₫'}</td>
      </tr>
      <tr>
        <td>{OrderConfigs.properties.totalPay.label}</td>
        <td>{MiscUtils.formatPrice(entity.totalPay) + ' ₫'}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={OrderConfigs.manageTitleLinks}
          title={OrderConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={OrderConfigs.resourceUrl}
          resourceKey={OrderConfigs.resourceKey}
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
          properties={OrderConfigs.properties}
          resourceUrl={OrderConfigs.resourceUrl}
          resourceKey={OrderConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default OrderManage;
