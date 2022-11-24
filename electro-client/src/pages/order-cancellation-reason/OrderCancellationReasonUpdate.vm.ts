import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import OrderCancellationReasonConfigs from 'pages/order-cancellation-reason/OrderCancellationReasonConfigs';
import { OrderCancellationReasonRequest, OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useOrderCancellationReasonUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: OrderCancellationReasonConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderCancellationReasonConfigs.createUpdateFormSchema),
  });

  const [orderCancellationReason, setOrderCancellationReason] = useState<OrderCancellationReasonResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<OrderCancellationReasonRequest, OrderCancellationReasonResponse>(OrderCancellationReasonConfigs.resourceUrl, OrderCancellationReasonConfigs.resourceKey, id);
  useGetByIdApi<OrderCancellationReasonResponse>(OrderCancellationReasonConfigs.resourceUrl, OrderCancellationReasonConfigs.resourceKey, id,
    (orderCancellationReasonResponse) => {
      setOrderCancellationReason(orderCancellationReasonResponse);
      const formValues: typeof form.values = {
        name: orderCancellationReasonResponse.name,
        note: orderCancellationReasonResponse.note || '',
        status: String(orderCancellationReasonResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: OrderCancellationReasonRequest = {
        name: formValues.name,
        note: formValues.note || null,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Có hiệu lực',
    },
    {
      value: '2',
      label: 'Vô hiệu lực',
    },
  ];

  return {
    orderCancellationReason,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useOrderCancellationReasonUpdateViewModel;
