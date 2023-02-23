import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderResourceRequest, OrderResourceResponse } from 'models/OrderResource';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { CustomerResourceResponse } from 'models/CustomerResource';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';

function useOrderResourceUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: OrderResourceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderResourceConfigs.createUpdateFormSchema),
  });

  const [orderResource, setOrderResource] = useState<OrderResourceResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [customerResourceSelectList, setCustomerResourceSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<OrderResourceRequest, OrderResourceResponse>(OrderResourceConfigs.resourceUrl, OrderResourceConfigs.resourceKey, id);
  useGetByIdApi<OrderResourceResponse>(OrderResourceConfigs.resourceUrl, OrderResourceConfigs.resourceKey, id,
    (orderResourceResponse) => {
      setOrderResource(orderResourceResponse);
      const formValues: typeof form.values = {
        code: orderResourceResponse.code,
        name: orderResourceResponse.name,
        color: orderResourceResponse.color,
        customerResourceId: orderResourceResponse.customerResource ? String(orderResourceResponse.customerResource.id) : null,
        status: String(orderResourceResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );
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
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: OrderResourceRequest = {
        code: formValues.code,
        name: formValues.name,
        color: formValues.color,
        customerResourceId: Number(formValues.customerResourceId) || null,
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
    orderResource,
    form,
    handleFormSubmit,
    customerResourceSelectList,
    statusSelectList,
  };
}

export default useOrderResourceUpdateViewModel;
