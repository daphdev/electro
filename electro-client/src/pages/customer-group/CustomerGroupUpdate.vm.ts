import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CustomerGroupConfigs from 'pages/customer-group/CustomerGroupConfigs';
import { CustomerGroupRequest, CustomerGroupResponse } from 'models/CustomerGroup';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useCustomerGroupUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CustomerGroupConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerGroupConfigs.createUpdateFormSchema),
  });

  const [customerGroup, setCustomerGroup] = useState<CustomerGroupResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<CustomerGroupRequest, CustomerGroupResponse>(CustomerGroupConfigs.resourceUrl, CustomerGroupConfigs.resourceKey, id);
  useGetByIdApi<CustomerGroupResponse>(CustomerGroupConfigs.resourceUrl, CustomerGroupConfigs.resourceKey, id,
    (customerGroupResponse) => {
      setCustomerGroup(customerGroupResponse);
      const formValues: typeof form.values = {
        code: customerGroupResponse.code,
        name: customerGroupResponse.name,
        description: customerGroupResponse.description,
        color: customerGroupResponse.color,
        status: String(customerGroupResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CustomerGroupRequest = {
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
    customerGroup,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useCustomerGroupUpdateViewModel;
