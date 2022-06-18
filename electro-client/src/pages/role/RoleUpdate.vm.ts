import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import RoleConfigs from 'pages/role/RoleConfigs';
import { RoleRequest, RoleResponse } from 'models/Role';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useRoleUpdateViewModel(id: number) {
  const updateApi = useUpdateApi<RoleRequest, RoleResponse>(RoleConfigs.resourceUrl, RoleConfigs.resourceKey, id);
  const { data: roleResponse } = useGetByIdApi<RoleResponse>(RoleConfigs.resourceUrl, RoleConfigs.resourceKey, id);

  const [role, setRole] = useState<RoleResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const form = useForm({
    initialValues: RoleConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(RoleConfigs.createUpdateFormSchema),
  });

  if (!role && roleResponse) {
    setRole(roleResponse);
    const formValues: typeof form.values = {
      code: roleResponse.code,
      name: roleResponse.name,
      status: String(roleResponse.status),
    };
    form.setValues(formValues);
    setPrevFormValues(formValues);
  }

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: RoleRequest = {
        code: formValues.code,
        name: formValues.name,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
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
    role,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useRoleUpdateViewModel;
