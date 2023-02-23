import React from 'react';
import { ActionIcon, Anchor, Badge, Stack, Table, useMantineTheme } from '@mantine/core';
import { ManageHeader, ManageHeaderTitle, ManageMain, ManagePagination } from 'components';
import InventoryConfigs from 'pages/inventory/InventoryConfigs';
import PageConfigs from 'pages/PageConfigs';
import { ListResponse } from 'utils/FetchUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProductInventoryResponse } from 'models/ProductInventory';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { Plus } from 'tabler-icons-react';
import { DocketVariantExtendedResponse } from 'models/DocketVariantExtended';
import { useModals } from '@mantine/modals';
import DateUtils from 'utils/DateUtils';

function InventoryManage() {
  useResetManagePageState();

  const theme = useMantineTheme();
  const modals = useModals();

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<ProductInventoryResponse>,
  } = useGetAllApi<ProductInventoryResponse>(
    InventoryConfigs.productInventoryResourceUrl,
    InventoryConfigs.productInventoryResourceKey
  );

  const handleTransactionsAnchor = (productName: string, transactions: DocketVariantExtendedResponse[]) => {
    modals.openModal({
      size: 1200,
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Lịch sử nhập xuất của sản phẩm &quot;{productName}&quot;</strong>,
      children: <ProductInventoryTransactionsModal transactions={transactions}/>,
    });
  };

  const entitiesTableHeadsFragment = (
    <tr>
      <th>Mã sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Nhãn hiệu</th>
      <th>Nhà cung cấp</th>
      <th>Tồn thực tế</th>
      <th>Chờ xuất</th>
      <th>Có thể bán</th>
      <th>Sắp về</th>
      <th>Theo dõi</th>
      <th>Lịch sử</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity) => (
    <tr key={entity.product.id}>
      <td>{entity.product.code}</td>
      <td>{entity.product.name}</td>
      <td>{entity.product.brand?.name}</td>
      <td>{entity.product.supplier?.displayName}</td>
      <td>{entity.inventory}</td>
      <td>{entity.waitingForDelivery}</td>
      <td>{entity.canBeSold}</td>
      <td>{entity.areComing}</td>
      <td>
        <ActionIcon
          color="blue"
          variant="hover"
          size={24}
          title="Thiết lập định mức tồn kho cho sản phẩm"
        >
          <Plus/>
        </ActionIcon>
      </td>
      <td>
        <Anchor inherit onClick={() => handleTransactionsAnchor(entity.product.name, entity.transactions)}>
          Giao dịch
        </Anchor>
      </td>
    </tr>
  ));

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={InventoryConfigs.manageTitleLinks}
          title={InventoryConfigs.manageTitle}
        />
      </ManageHeader>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <Table
          horizontalSpacing="sm"
          verticalSpacing="sm"
          highlightOnHover
          striped
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
          })}
        >
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

function ProductInventoryTransactionsModal({ transactions }: { transactions: DocketVariantExtendedResponse[] }) {
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

  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="xs"
      highlightOnHover
      striped
    >
      <thead>
        <tr>
          <th>Phiếu</th>
          <th>Ngày tạo</th>
          <th>Lý do</th>
          <th>Mã đơn nhập hàng</th>
          <th>Mã đơn hàng</th>
          <th>Số lượng</th>
          <th>SKU</th>
          <th>Kho</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.docket.code}>
            <td>{docketTypeBadgeFragment(transaction.docket.type)}</td>
            <td>{DateUtils.isoDateToString(transaction.docket.createdAt)}</td>
            <td>{transaction.docket.reason.name}</td>
            <td>{transaction.docket.purchaseOrder?.code}</td>
            <td>{transaction.docket.order?.code}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.variant.sku}</td>
            <td>{transaction.docket.warehouse.name}</td>
            <td>{docketStatusBadgeFragment(transaction.docket.status)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InventoryManage;
