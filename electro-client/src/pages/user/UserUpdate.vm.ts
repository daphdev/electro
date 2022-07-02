import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import UserConfigs from 'pages/user/UserConfigs';
import { UserRequest, UserResponse } from 'models/User';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { RoleResponse } from 'models/Role';
import { SelectOption } from 'types';
import RoleConfigs from 'pages/role/RoleConfigs';

function useUserUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: UserConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(UserConfigs.createUpdateFormSchema),
  });

  const [user, setUser] = useState<UserResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);
  const [roleSelectList, setRoleSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<UserRequest, UserResponse>(UserConfigs.resourceUrl, UserConfigs.resourceKey, id);
  useGetByIdApi<UserResponse>(UserConfigs.resourceUrl, UserConfigs.resourceKey, id,
    (userResponse) => {
      setUser(userResponse);
      const formValues: typeof form.values = {
        username: userResponse.username,
        password: '',
        fullname: userResponse.fullname,
        email: userResponse.email,
        phone: userResponse.phone,
        gender: userResponse.gender,
        'address.line': userResponse.address.line || '',
        'address.provinceId': userResponse.address.province ? String(userResponse.address.province.id) : null,
        'address.districtId': userResponse.address.district ? String(userResponse.address.district.id) : null,
        avatar: userResponse.avatar || '',
        status: String(userResponse.status),
        roles: userResponse.roles.map((role) => String(role.id)),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );
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
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: UserRequest = {
        username: formValues.username,
        password: formValues.password || null,
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
      updateApi.mutate(requestBody);
    }
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
    user,
    form,
    handleFormSubmit,
    genderSelectList,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
    roleSelectList,
  };
}

export default useUserUpdateViewModel;
