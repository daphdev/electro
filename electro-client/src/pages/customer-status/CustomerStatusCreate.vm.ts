import { useForm, zodResolver } from '@mantine/form';
import CustomerStatusConfigs from 'pages/customer-status/CustomerStatusConfigs';
import { CustomerStatusRequest, CustomerStatusResponse } from 'models/CustomerStatus';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useCustomerStatusCreateViewModel() {
  const form = useForm({
    initialValues: CustomerStatusConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerStatusConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<CustomerStatusRequest, CustomerStatusResponse>(CustomerStatusConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CustomerStatusRequest = {
      code: formValues.code,
      name: formValues.name,
      description: formValues.description,
      color: formValues.color,
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

export default useCustomerStatusCreateViewModel;
