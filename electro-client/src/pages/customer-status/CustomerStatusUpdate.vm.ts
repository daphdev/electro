import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CustomerStatusConfigs from 'pages/customer-status/CustomerStatusConfigs';
import { CustomerStatusRequest, CustomerStatusResponse } from 'models/CustomerStatus';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useCustomerStatusUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CustomerStatusConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerStatusConfigs.createUpdateFormSchema),
  });

  const [customerStatus, setCustomerStatus] = useState<CustomerStatusResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<CustomerStatusRequest, CustomerStatusResponse>(CustomerStatusConfigs.resourceUrl, CustomerStatusConfigs.resourceKey, id);
  useGetByIdApi<CustomerStatusResponse>(CustomerStatusConfigs.resourceUrl, CustomerStatusConfigs.resourceKey, id,
    (customerStatusResponse) => {
      setCustomerStatus(customerStatusResponse);
      const formValues: typeof form.values = {
        code: customerStatusResponse.code,
        name: customerStatusResponse.name,
        description: customerStatusResponse.description,
        color: customerStatusResponse.color,
        status: String(customerStatusResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CustomerStatusRequest = {
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
    customerStatus,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useCustomerStatusUpdateViewModel;
