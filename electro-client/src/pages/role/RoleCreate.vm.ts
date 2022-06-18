import { useForm, zodResolver } from '@mantine/form';
import RoleConfigs from 'pages/role/RoleConfigs';
import { RoleRequest, RoleResponse } from 'models/Role';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useRoleCreateViewModel() {
  const createApi = useCreateApi<RoleRequest, RoleResponse>(RoleConfigs.resourceUrl);

  const form = useForm({
    initialValues: RoleConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(RoleConfigs.createUpdateFormSchema),
  });

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: RoleRequest = {
      code: formValues.code,
      name: formValues.name,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Đang sử dụng',
    },
    {
      value: '2',
      label: 'Không sử dụng',
    },
  ];

  return {
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useRoleCreateViewModel;
