import { useForm, zodResolver } from '@mantine/form';
import OrderCancellationReasonConfigs from 'pages/order-cancellation-reason/OrderCancellationReasonConfigs';
import { OrderCancellationReasonRequest, OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useOrderCancellationReasonCreateViewModel() {
  const form = useForm({
    initialValues: OrderCancellationReasonConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderCancellationReasonConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<OrderCancellationReasonRequest, OrderCancellationReasonResponse>(OrderCancellationReasonConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: OrderCancellationReasonRequest = {
      name: formValues.name,
      note: formValues.note || null,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
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
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useOrderCancellationReasonCreateViewModel;
