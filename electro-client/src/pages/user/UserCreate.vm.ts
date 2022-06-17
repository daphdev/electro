import { useForm, zodResolver } from '@mantine/form';
import UserConfigs from 'pages/user/UserConfigs';
import { UserRequest, UserResponse } from 'models/User';
import useCreateApi from 'hooks/use-create-api';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { useState } from 'react';
import { SelectOption } from 'types';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { RoleResponse } from 'models/Role';

function useUserCreateViewModel() {
  const createApi = useCreateApi<UserRequest, UserResponse>(UserConfigs.resourceUrl);
  const { data: provinceListResponse } = useGetAllApi<ProvinceResponse>(
    ProvinceConfigs.resourceUrl,
    ProvinceConfigs.resourceKey,
    { all: 1 }
  );
  const { data: districtListResponse } = useGetAllApi<DistrictResponse>(
    DistrictConfigs.resourceUrl,
    DistrictConfigs.resourceKey,
    { all: 1 }
  );
  const { data: roleListResponse } = useGetAllApi<RoleResponse>(
    'http://localhost:8085/api/roles',
    'roles',
    { sort: 'id,asc', all: 1 }
  );

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>();
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>();
  const [roleSelectList, setRoleSelectList] = useState<SelectOption[]>();

  const form = useForm({
    initialValues: UserConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(UserConfigs.createUpdateFormSchema),
  });

  if (!provinceSelectList && provinceListResponse) {
    const selectList: SelectOption[] = provinceListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setProvinceSelectList(selectList);
  }

  if (!districtSelectList && districtListResponse) {
    const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setDistrictSelectList(selectList);
  }

  if (!roleSelectList && roleListResponse) {
    const selectList: SelectOption[] = roleListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setRoleSelectList(selectList);
  }

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: UserRequest = {
      username: formValues.username,
      password: formValues.password,
      fullname: formValues.fullname,
      email: formValues.email,
      phone: formValues.phone,
      gender: formValues.gender,
      address: {
        line: formValues['address.line'],
        provinceId: Number(formValues['address.provinceId']),
        districtId: Number(formValues['address.districtId']),
      },
      avatar: formValues.avatar.trim() || null,
      status: Number(formValues.status),
      roles: formValues.roles.map((roleId) => ({ id: Number(roleId) })),
    };
    createApi.mutate(requestBody);
  });

  const genderSelectList: SelectOption[] = [
    {
      value: 'M',
      label: 'Nam',
    },
    {
      value: 'F',
      label: 'Nữ',
    },
  ];

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Đang hoạt động',
    },
    {
      value: '2',
      label: 'Ít hoạt động',
    },
    {
      value: '3',
      label: 'Không hoạt động',
    },
  ];

  return {
    form,
    handleFormSubmit,
    genderSelectList,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
    roleSelectList,
  };
}

export default useUserCreateViewModel;
