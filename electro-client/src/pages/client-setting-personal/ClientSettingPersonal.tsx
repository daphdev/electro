import React, { useState } from 'react';
import useTitle from 'hooks/use-title';
import { Button, Card, Container, Grid, Select, Stack, TextInput, Title } from '@mantine/core';
import { ClientUserNavbar } from 'components';
import { ClientPersonalSettingUserRequest, SelectOption } from 'types';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import useAuthStore from 'stores/use-auth-store';
import { useForm, zodResolver } from '@mantine/form';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import MiscUtils from 'utils/MiscUtils';
import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { UserResponse } from 'models/User';
import { WardResponse } from 'models/Ward';
import WardConfigs from 'pages/ward/WardConfigs';
import useSelectAddress from 'hooks/use-select-address';

const formSchema = z.object({
  username: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
    .min(2, MessageUtils.min('Tên tài khoản', 2)),
  fullname: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  gender: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  'address.line': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  'address.provinceId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  'address.districtId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  'address.wardId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
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

function ClientSettingPersonal() {
  useTitle();

  const { user, updateUser } = useAuthStore();

  const initialFormValues = {
    username: user?.username as string,
    fullname: user?.fullname as string,
    gender: user?.gender as 'M' | 'F',
    'address.line': user?.address.line as string,
    'address.provinceId': String(user?.address.province?.id) as string | null,
    'address.districtId': String(user?.address.district?.id) as string | null,
    'address.wardId': String(user?.address.ward?.id) as string | null,
  };

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  useSelectAddress(form, 'address.provinceId', 'address.districtId', 'address.wardId');

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);
  const [wardSelectList, setWardSelectList] = useState<SelectOption[]>([]);

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
    { all: 1, filter: `province.id==${form.values['address.provinceId'] || 0}` },
    (districtListResponse) => {
      const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDistrictSelectList(selectList);
    }
  );
  useGetAllApi<WardResponse>(WardConfigs.resourceUrl, WardConfigs.resourceKey,
    { all: 1, filter: `district.id==${form.values['address.districtId'] || 0}` },
    (wardListResponse) => {
      const selectList: SelectOption[] = wardListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setWardSelectList(selectList);
    }
  );

  const updatePersonalSettingApi = useMutation<UserResponse, ErrorMessage, ClientPersonalSettingUserRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_USER_PERSONAL_SETTING, requestBody),
    {
      onSuccess: (userResponse) => {
        updateUser(userResponse);
        NotifyUtils.simpleSuccess('Cập nhật thành công');
      },
      onError: () => NotifyUtils.simpleFailed('Cập nhật không thành công'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: ClientPersonalSettingUserRequest = {
      username: formValues.username,
      fullname: formValues.fullname,
      gender: formValues.gender,
      address: {
        line: formValues['address.line'],
        provinceId: Number(formValues['address.provinceId']),
        districtId: Number(formValues['address.districtId']),
        wardId: Number(formValues['address.wardId']),
      },
    };

    updatePersonalSettingApi.mutate(requestBody);
  });

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Cập nhật thông tin cá nhân
                </Title>
                <Grid>
                  <Grid.Col lg={6}>
                    <form onSubmit={handleFormSubmit}>
                      <Stack>
                        <TextInput
                          required
                          radius="md"
                          label="Tên tài khoản"
                          placeholder="Nhập tên tài khoản của bạn"
                          {...form.getInputProps('username')}
                          disabled
                          // TODO: Hiện tại chưa cho phép sửa username
                        />
                        <TextInput
                          required
                          radius="md"
                          label="Họ và tên"
                          placeholder="Nhập họ và tên của bạn"
                          {...form.getInputProps('fullname')}
                        />
                        <Select
                          required
                          radius="md"
                          label="Giới tính"
                          placeholder="Chọn giới tính"
                          data={genderSelectList}
                          {...form.getInputProps('gender')}
                        />
                        <Select
                          required
                          radius="md"
                          label="Tỉnh thành"
                          placeholder="Chọn tỉnh thành"
                          data={provinceSelectList}
                          {...form.getInputProps('address.provinceId')}
                        />
                        <Select
                          required
                          radius="md"
                          label="Quận huyện"
                          placeholder="Chọn quận huyện"
                          data={districtSelectList}
                          disabled={form.values['address.provinceId'] === null}
                          {...form.getInputProps('address.districtId')}
                        />
                        <Select
                          required
                          radius="md"
                          label="Phường xã"
                          placeholder="Chọn phường xã"
                          data={wardSelectList}
                          disabled={form.values['address.districtId'] === null}
                          {...form.getInputProps('address.wardId')}
                        />
                        <TextInput
                          required
                          radius="md"
                          label="Địa chỉ"
                          placeholder="Nhập địa chỉ của bạn"
                          {...form.getInputProps('address.line')}
                        />
                        <Button
                          radius="md"
                          type="submit"
                          disabled={MiscUtils.isEquals(initialFormValues, form.values)}
                        >
                          Cập nhật
                        </Button>
                      </Stack>
                    </form>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientSettingPersonal;
