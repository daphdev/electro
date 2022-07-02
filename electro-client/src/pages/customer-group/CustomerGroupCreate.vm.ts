import { useForm, zodResolver } from '@mantine/form';
import CustomerGroupConfigs from 'pages/customer-group/CustomerGroupConfigs';
import { CustomerGroupRequest, CustomerGroupResponse } from 'models/CustomerGroup';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useCustomerGroupCreateViewModel() {
  const form = useForm({
    initialValues: CustomerGroupConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerGroupConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<CustomerGroupRequest, CustomerGroupResponse>(CustomerGroupConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CustomerGroupRequest = {
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

export default useCustomerGroupCreateViewModel;
