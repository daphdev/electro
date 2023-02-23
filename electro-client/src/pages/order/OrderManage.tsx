import React from 'react';
import { ActionIcon, ColorSwatch, Group, Highlight, Stack, Text, useMantineTheme } from '@mantine/core';
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
import DefaultOrderConfigs from 'pages/order/DefaultOrderConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';
import { Clipboard, Plus } from 'tabler-icons-react';
import NotifyUtils from 'utils/NotifyUtils';
import DocketConfigs from 'pages/docket/DocketConfigs';

function OrderManage() {
  const theme = useMantineTheme();

  useResetManagePageState();
  useInitFilterPanelState(DefaultOrderConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<OrderResponse>,
  } = useGetAllApi<OrderResponse>(DefaultOrderConfigs.resourceUrl, DefaultOrderConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const showedPropertiesFragment = (entity: OrderResponse) => {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[entity.paymentMethodType];

    return (
      <>
        <td>{entity.id}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
        <td>
          <Group spacing="xs">
            <Highlight
              highlight={searchToken}
              highlightColor="blue"
              size="sm"
              sx={{ fontFamily: theme.fontFamilyMonospace }}
            >
              {entity.code}
            </Highlight>
            <ActionIcon
              color="blue"
              variant="outline"
              size="sm"
              title="Sao chép mã đơn hàng này"
              onClick={() => {
                void navigator.clipboard.writeText(entity.code);
                NotifyUtils.simple(<Text inherit>Đã sao chép mã đơn hàng <strong>{entity.code}</strong></Text>);
              }}
            >
              <Clipboard size={15} strokeWidth={1.5}/>
            </ActionIcon>
          </Group>
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
            <Highlight highlight={searchToken} highlightColor="blue" size="xs">
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
          <Stack align="end" spacing={5}>
            <Text weight={500} size="sm">{MiscUtils.formatPrice(entity.totalPay) + ' ₫'}</Text>
            <PaymentMethodIcon color={theme.colors.gray[5]}/>
          </Stack>
        </td>
        <td>
          <ActionIcon
            color="blue"
            variant="hover"
            size={24}
            title="Tạo phiếu xuất kho"
            component="a"
            href={DocketConfigs.managerPath + '/create'}
            target="_blank"
          >
            <Plus/>
          </ActionIcon>
        </td>
        <td>
          <Stack spacing="xs" sx={{ alignItems: 'start' }}>
            {DefaultOrderConfigs.orderStatusBadgeFragment(entity.status)}
            {DefaultOrderConfigs.orderPaymentStatusBadgeFragment(entity.paymentStatus)}
          </Stack>
        </td>
      </>
    );
  };

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={DefaultOrderConfigs.manageTitleLinks}
          title={DefaultOrderConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={DefaultOrderConfigs.resourceUrl}
          resourceKey={DefaultOrderConfigs.resourceKey}
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
          properties={DefaultOrderConfigs.properties}
          resourceUrl={DefaultOrderConfigs.resourceUrl}
          resourceKey={DefaultOrderConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={DefaultOrderConfigs.entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default OrderManage;
