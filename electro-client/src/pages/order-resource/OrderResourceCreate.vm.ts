import { useForm, zodResolver } from '@mantine/form';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderResourceRequest, OrderResourceResponse } from 'models/OrderResource';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';
import { useState } from 'react';
import useGetAllApi from 'hooks/use-get-all-api';
import { CustomerResourceResponse } from 'models/CustomerResource';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';

function useOrderResourceCreateViewModel() {
  const form = useForm({
    initialValues: OrderResourceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderResourceConfigs.createUpdateFormSchema),
  });

  const [customerResourceSelectList, setCustomerResourceSelectList] = useState<SelectOption[]>([]);

  const createApi = useCreateApi<OrderResourceRequest, OrderResourceResponse>(OrderResourceConfigs.resourceUrl);
  useGetAllApi<CustomerResourceResponse>(CustomerResourceConfigs.resourceUrl, CustomerResourceConfigs.resourceKey,
    { all: 1 },
    (customerResourceListResponse) => {
      const selectList: SelectOption[] = customerResourceListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setCustomerResourceSelectList(selectList);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: OrderResourceRequest = {
      code: formValues.code,
      name: formValues.name,
      color: formValues.color,
      customerResourceId: Number(formValues.customerResourceId) || null,
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
    customerResourceSelectList,
    statusSelectList,
  };
}

export default useOrderResourceCreateViewModel;
