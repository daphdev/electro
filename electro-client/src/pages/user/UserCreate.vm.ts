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
import RoleConfigs from 'pages/role/RoleConfigs';

function useUserCreateViewModel() {
  const form = useForm({
    initialValues: UserConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(UserConfigs.createUpdateFormSchema),
  });

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);
  const [roleSelectList, setRoleSelectList] = useState<SelectOption[]>([]);

  const createApi = useCreateApi<UserRequest, UserResponse>(UserConfigs.resourceUrl);
  useGetAllApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey,
    { all: 1 },
    (provinceListResponse) => {
      const selectList: SelectOption[] = provinceListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setProvinceSelectList(selectList);
    }
  );
  useGetAllApi<DistrictResponse>(DistrictConfigs.resourceUrl, DistrictConfigs.resourceKey,
    { all: 1 },
    (districtListResponse) => {
      const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDistrictSelectList(selectList);
    }
  );
  useGetAllApi<RoleResponse>(RoleConfigs.resourceUrl, RoleConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (roleListResponse) => {
      const selectList: SelectOption[] = roleListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setRoleSelectList(selectList);
    }
  );

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
        wardId: null,
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
      label: 'Đã kích hoạt',
    },
    {
      value: '2',
      label: 'Chưa kích hoạt',
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
