import React from 'react';
import PageConfigs from 'pages/PageConfigs';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { PaymentMethodRequest, PaymentMethodResponse } from 'models/PaymentMethod';
import PaymentMethodConfigs from 'pages/payment-method/PaymentMethodConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { Alert, Badge, Button, Group, LoadingOverlay, Paper, Stack, Switch, Table, Text } from '@mantine/core';
import { ManageHeader, ManageHeaderTitle } from 'components';
import { AlertCircle } from 'tabler-icons-react';
import { formList, useForm } from '@mantine/form';
import MiscUtils from 'utils/MiscUtils';
import { useMutation, useQueryClient } from 'react-query';
import NotifyUtils from 'utils/NotifyUtils';

function PaymentMethodManage() {
  const queryClient = useQueryClient();

  useResetManagePageState();

  const form = useForm({
    initialValues: {
      paymentMethods: formList([] as Array<{ status: boolean }>),
    },
  });

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<PaymentMethodResponse>,
  } = useGetAllApi<PaymentMethodResponse>(
    PaymentMethodConfigs.resourceUrl,
    PaymentMethodConfigs.resourceKey,
    { all: 1, sort: 'id,asc' },
    (data) =>
      form.setFieldValue('paymentMethods', formList(data.content.map(entity => ({ status: entity.status === 1 })))),
    { refetchOnWindowFocus: false }
  );

  const updatePaymentMethodApi = useUpdatePaymentMethodApi();

  const handleUpdateButton = async () => {
    if (!form.values.paymentMethods.every(p => !p.status)) {
      try {
        const updatePaymentMethodRequests: UpdatePaymentMethodRequest[] = [];

        listResponse.content.forEach((entity, index) => {
          const currentStatus = form.values.paymentMethods[index].status ? 1 : 2;

          if (currentStatus !== entity.status) {
            updatePaymentMethodRequests.push({
              id: entity.id,
              body: { status: currentStatus },
            });
          }
        });

        await Promise.all(updatePaymentMethodRequests.map(async (request) => {
          await updatePaymentMethodApi.mutateAsync(request);
        }));

        NotifyUtils.simpleSuccess('Cập nhật thành công');
        void queryClient.invalidateQueries([PaymentMethodConfigs.resourceKey, 'getAll']);
      } catch (e) {
        NotifyUtils.simpleFailed('Cập nhật không thành công');
      }
    }
  };

  const paymentMethodStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="blue" variant="filled" size="sm">Đang sử dụng</Badge>;
    case 2:
      return <Badge color="pink" variant="filled" size="sm">Không sử dụng</Badge>;
    }
  };

  const entitiesTableHeadsFragment = (
    <tr>
      <th>Kích hoạt</th>
      <th>Hình thức thanh toán</th>
      <th>Mã</th>
      <th>Trạng thái</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity, index) => {
    const PaymentMethodIcon = PageConfigs.paymentMethodIconMap[entity.code];

    return (
      <tr key={entity.id}>
        <td>
          <Switch
            size="md"
            {...form.getListInputProps('paymentMethods', index, 'status', { type: 'checkbox' })}
          />
        </td>
        <td>
          <Group spacing="xs">
            <PaymentMethodIcon/>
            <Text>{entity.name}</Text>
          </Group>
        </td>
        <td>{entity.code}</td>
        <td>{paymentMethodStatusBadgeFragment(entity.status)}</td>
      </tr>
    );
  });

  const disabledUpdateButton = MiscUtils.isEquals(
    listResponse.content.map(entity => ({ status: entity.status === 1 })),
    form.values.paymentMethods
  ) || form.values.paymentMethods.every(p => !p.status);

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={PaymentMethodConfigs.manageTitleLinks}
          title={PaymentMethodConfigs.manageTitle}
        />
      </ManageHeader>

      <Alert
        icon={<AlertCircle size={16}/>}
        title="Thông báo"
        color="pink"
        radius="md"
      >
        Kích hoạt một vài hoặc tất cả các hình thức thanh toán, luôn phải có ít nhất một hình thức thanh toán được chọn.
      </Alert>

      <Paper shadow="xs" sx={{ position: 'relative', height: listResponse.content.length === 0 ? 170 : 'auto' }}>
        <LoadingOverlay visible={isLoading} zIndex={50}/>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </Paper>

      <Button
        sx={{ width: 'fit-content' }}
        disabled={disabledUpdateButton}
        onClick={handleUpdateButton}
      >
        Cập nhật
      </Button>
    </Stack>
  );
}

type UpdatePaymentMethodRequest = { id: number, body: PaymentMethodRequest };

function useUpdatePaymentMethodApi() {
  return useMutation<PaymentMethodResponse, ErrorMessage, UpdatePaymentMethodRequest>(
    (request) => FetchUtils.update(PaymentMethodConfigs.resourceUrl, request.id, request.body)
  );
}

export default PaymentMethodManage;
