import React from 'react';
import { Badge, Highlight, Stack, Text, useMantineTheme } from '@mantine/core';
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
import { WaybillResponse } from 'models/Waybill';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import WaybillConfigs from 'pages/waybill/WaybillConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import MiscUtils from 'utils/MiscUtils';

function WaybillManage() {
  useResetManagePageState();
  useInitFilterPanelState(WaybillConfigs.properties);

  const theme = useMantineTheme();

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<WaybillResponse>,
  } = useGetAllApi<WaybillResponse>(WaybillConfigs.resourceUrl, WaybillConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const waybillStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge variant="outline" size="sm" color="gray">Đợi lấy hàng</Badge>;
    case 2:
      return <Badge variant="outline" size="sm" color="blue">Đang giao</Badge>;
    case 3:
      return <Badge variant="outline" size="sm" color="green">Đã giao</Badge>;
    case 4:
      return <Badge variant="outline" size="sm" color="red">Hủy</Badge>;
    }
  };

  const showedPropertiesFragment = (entity: WaybillResponse) => {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[entity.order.paymentMethodType];

    return (
      <>
        <td>{entity.id}</td>
        <td>
          <Highlight
            highlight={searchToken}
            highlightColor="blue"
            size="sm"
            sx={{ fontFamily: theme.fontFamilyMonospace }}
          >
            {entity.code}
          </Highlight>
        </td>
        <td>
          <Stack spacing={2.5}>
            <Highlight
              highlight={searchToken}
              highlightColor="blue"
              size="sm"
              sx={{ fontFamily: theme.fontFamilyMonospace }}
            >
              {entity.order.code}
            </Highlight>
            <PaymentMethodIcon color={theme.colors.gray[5]}/>
          </Stack>
        </td>
        <td>{DateUtils.isoDateToString(entity.shippingDate, 'DD/MM/YYYY')}</td>
        <td>{DateUtils.isoDateToString(entity.expectedDeliveryTime, 'DD/MM/YYYY')}</td>
        <td>{waybillStatusBadgeFragment(entity.status)}</td>
        <td style={{ textAlign: 'right' }}>{MiscUtils.formatPrice(entity.codAmount) + ' ₫'}</td>
        <td style={{ textAlign: 'right' }}>{MiscUtils.formatPrice(entity.shippingFee) + ' ₫'}</td>
        <td>
          <Stack spacing={5}>
            <Text size="xs">Khối lượng: <b>{entity.weight}</b> (gram)</Text>
            <Text size="xs">Chiều dài: <b>{entity.length}</b> (cm)</Text>
            <Text size="xs">Chiều rộng: <b>{entity.width}</b> (cm)</Text>
            <Text size="xs">Chiều cao: <b>{entity.height}</b> (cm)</Text>
          </Stack>
        </td>
      </>
    );
  };

  const entityDetailTableRowsFragment = (entity: WaybillResponse) => (
    <>
      <tr>
        <td>{WaybillConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties['order.code'].label}</td>
        <td>{entity.order.code}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.shippingDate.label}</td>
        <td>{DateUtils.isoDateToString(entity.shippingDate, 'DD/MM/YYYY')}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.expectedDeliveryTime.label}</td>
        <td>{DateUtils.isoDateToString(entity.expectedDeliveryTime, 'DD/MM/YYYY')}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.status.label}</td>
        <td>{waybillStatusBadgeFragment(entity.status)}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.codAmount.label}</td>
        <td>{MiscUtils.formatPrice(entity.codAmount) + ' ₫'}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.shippingFee.label}</td>
        <td>{MiscUtils.formatPrice(entity.shippingFee) + ' ₫'}</td>
      </tr>
      <tr>
        <td>{WaybillConfigs.properties.size.label}</td>
        <td>
          <Stack spacing={5}>
            <Text size="xs">Khối lượng: <b>{entity.weight}</b> (gram)</Text>
            <Text size="xs">Chiều dài: <b>{entity.length}</b> (cm)</Text>
            <Text size="xs">Chiều rộng: <b>{entity.width}</b> (cm)</Text>
            <Text size="xs">Chiều cao: <b>{entity.height}</b> (cm)</Text>
          </Stack>
        </td>
      </tr>
      <tr>
        <td>Ghi chú vận đơn</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>Người trả phí dịch vụ GHN</td>
        <td>{WaybillConfigs.ghnPaymentTypeIdMap[entity.ghnPaymentTypeId]}</td>
      </tr>
      <tr>
        <td>Ghi chú cho dịch vụ GHN</td>
        <td>{WaybillConfigs.ghnRequiredNoteMap[entity.ghnRequiredNote]}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={WaybillConfigs.manageTitleLinks}
          title={WaybillConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={WaybillConfigs.resourceUrl}
          resourceKey={WaybillConfigs.resourceKey}
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
          properties={WaybillConfigs.properties}
          resourceUrl={WaybillConfigs.resourceUrl}
          resourceKey={WaybillConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default WaybillManage;