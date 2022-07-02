import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';
import { CustomerResourceRequest, CustomerResourceResponse } from 'models/CustomerResource';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useCustomerResourceUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CustomerResourceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerResourceConfigs.createUpdateFormSchema),
  });

  const [customerResource, setCustomerResource] = useState<CustomerResourceResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<CustomerResourceRequest, CustomerResourceResponse>(CustomerResourceConfigs.resourceUrl, CustomerResourceConfigs.resourceKey, id);
  useGetByIdApi<CustomerResourceResponse>(CustomerResourceConfigs.resourceUrl, CustomerResourceConfigs.resourceKey, id,
    (customerResourceResponse) => {
      setCustomerResource(customerResourceResponse);
      const formValues: typeof form.values = {
        code: customerResourceResponse.code,
        name: customerResourceResponse.name,
        description: customerResourceResponse.description,
        color: customerResourceResponse.color,
        status: String(customerResourceResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CustomerResourceRequest = {
        code: formValues.code,
        name: formValues.name,
        description: formValues.description,
        color: formValues.color,
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
    customerResource,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useCustomerResourceUpdateViewModel;
