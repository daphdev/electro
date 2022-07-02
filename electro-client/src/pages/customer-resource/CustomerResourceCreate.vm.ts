import { useForm, zodResolver } from '@mantine/form';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';
import { CustomerResourceRequest, CustomerResourceResponse } from 'models/CustomerResource';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useCustomerResourceCreateViewModel() {
  const form = useForm({
    initialValues: CustomerResourceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerResourceConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<CustomerResourceRequest, CustomerResourceResponse>(CustomerResourceConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CustomerResourceRequest = {
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

export default useCustomerResourceCreateViewModel;
