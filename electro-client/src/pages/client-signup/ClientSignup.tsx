import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import MessageUtils from 'utils/MessageUtils';
import { useForm, zodResolver } from '@mantine/form';
import { Empty, RegistrationRequest, RegistrationResponse, SelectOption } from 'types';
import useTitle from 'hooks/use-title';
import useSelectAddress from 'hooks/use-select-address';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { WardResponse } from 'models/Ward';
import WardConfigs from 'pages/ward/WardConfigs';
import { useMutation } from 'react-query';
import { UserRequest } from 'models/User';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  PasswordInput,
  Select,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import useAuthStore from 'stores/use-auth-store';
import { Check, MailOpened, ShieldCheck, UserCheck } from 'tabler-icons-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MiscUtils from 'utils/MiscUtils';
import { useModals } from '@mantine/modals';

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

function ClientSignup() {
  useTitle();

  const { user, currentSignupUserId } = useAuthStore();

  const [searchParams] = useSearchParams();

  const userId = searchParams.get('userId') || currentSignupUserId;

  const currentStep = userId ? 1 : 0; // Nếu có userId thì nhảy sang bước 2

  const [active, setActive] = useState(currentStep);

  const nextStep = () => setActive((current) => current < 1 ? current + 1 : (current === 1 ? 3 : current));

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <main>
      <Container size="xl">
        <Stack align="center" spacing={50}>
          <Title order={2}>Đăng ký tài khoản</Title>

          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="xs"
            styles={{ root: { width: '100%', maxWidth: 800 }, content: { paddingTop: 50 } }}
          >
            <Stepper.Step
              icon={<UserCheck size={18}/>}
              label="Bước 1"
              description="Tạo tài khoản"
              allowStepSelect={false}
            >
              <ClientSignupStepOne nextStep={nextStep}/>
            </Stepper.Step>
            <Stepper.Step
              icon={<MailOpened size={18}/>}
              label="Bước 2"
              description="Xác nhận email"
              allowStepSelect={false}
            >
              <ClientSignupStepTwo nextStep={nextStep} userId={Number(userId) || null}/>
            </Stepper.Step>
            <Stepper.Step
              icon={<ShieldCheck size={18}/>}
              label="Bước 3"
              description="Đăng ký thành công"
              allowStepSelect={false}
            />
            <Stepper.Completed>
              <ClientSignupStepThree/>
            </Stepper.Completed>
          </Stepper>
        </Stack>
      </Container>
    </main>
  );
}

function ClientSignupStepOne({ nextStep }: { nextStep: () => void }) {
  const { updateCurrentSignupUserId } = useAuthStore();

  const initialFormValues = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    phone: '',
    gender: 'M' as 'M' | 'F',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    'address.wardId': null as string | null,
    avatar: null, // Không dùng
    status: '2', // Không dùng
    roles: [] as string[], // Không dùng
  };

  const formSchema = z.object({
    username: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .min(2, MessageUtils.min('Tên tài khoản', 2)),
    password: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .min(1, MessageUtils.min('Mật khẩu', 1)),
    fullname: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    email: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .email({ message: 'Nhập email đúng định dạng' }),
    phone: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .regex(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, { message: 'Nhập số điện thoại đúng định dạng' }),
    gender: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    'address.line': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    'address.provinceId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    'address.districtId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    'address.wardId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    avatar: z.string().nullable(),
    status: z.string(),
    roles: z.array(z.string()),
  });

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
    },
    { refetchOnWindowFocus: false }
  );
  useGetAllApi<DistrictResponse>(DistrictConfigs.resourceUrl, DistrictConfigs.resourceKey,
    { all: 1, filter: `province.id==${form.values['address.provinceId'] || 0}` },
    (districtListResponse) => {
      const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDistrictSelectList(selectList);
    },
    { refetchOnWindowFocus: false }
  );
  useGetAllApi<WardResponse>(WardConfigs.resourceUrl, WardConfigs.resourceKey,
    { all: 1, filter: `district.id==${form.values['address.districtId'] || 0}` },
    (wardListResponse) => {
      const selectList: SelectOption[] = wardListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setWardSelectList(selectList);
    },
    { refetchOnWindowFocus: false }
  );

  const registerUserApi = useMutation<RegistrationResponse, ErrorMessage, UserRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.CLIENT_REGISTRATION, requestBody),
    {
      onSuccess: (registrationResponse) => {
        NotifyUtils.simpleSuccess('Tạo tài khoản thành công');
        updateCurrentSignupUserId(registrationResponse.userId);
        nextStep();
      },
      onError: () => NotifyUtils.simpleFailed('Tạo tài khoản không thành công'),
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
        wardId: Number(formValues['address.wardId']),
      },
      avatar: formValues.avatar,
      status: Number(formValues.status),
      roles: [],
    };

    registerUserApi.mutate(requestBody);
  });

  return (
    <Card withBorder shadow="md" p={30} radius="md" sx={{ maxWidth: 500, margin: 'auto' }}>
      <form onSubmit={handleFormSubmit}>
        <Stack>
          <TextInput
            required
            radius="md"
            label="Tên tài khoản"
            placeholder="Nhập tên tài khoản mong muốn"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            required
            radius="md"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu mong muốn"
            {...form.getInputProps('password')}
          />
          <TextInput
            required
            radius="md"
            label="Họ và tên"
            placeholder="Nhập họ và tên của bạn"
            {...form.getInputProps('fullname')}
          />
          <TextInput
            required
            radius="md"
            label="Email"
            placeholder="Nhập email của bạn"
            {...form.getInputProps('email')}
          />
          <TextInput
            required
            radius="md"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của bạn"
            {...form.getInputProps('phone')}
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
            disabled={MiscUtils.isEquals(initialFormValues, form.values) || registerUserApi.isLoading}
          >
            Đăng ký
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

function ClientSignupStepTwo({ nextStep, userId }: { nextStep: () => void, userId: number | null }) {
  const theme = useMantineTheme();
  const modals = useModals();

  const { updateCurrentSignupUserId } = useAuthStore();

  const initialFormValues = {
    token: '',
  };

  const formSchema = z.object({
    token: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const confirmRegistrationApi = useMutation<void, ErrorMessage, RegistrationRequest>(
    (requestBody) => FetchUtils.post(ResourceURL.CLIENT_REGISTRATION_CONFIRM, requestBody),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Xác nhận tài khoản thành công');
        updateCurrentSignupUserId(null);
        nextStep();
      },
      onError: () => NotifyUtils.simpleFailed('Xác nhận tài khoản không thành công'),
    }
  );

  const resendRegistrationTokenApi = useMutation<Empty, ErrorMessage, { userId: number }>(
    (request) => FetchUtils.get(ResourceURL.CLIENT_REGISTRATION_RESEND_TOKEN(request.userId)),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Đã gửi lại mã xác nhận thành công');
        modals.closeAll();
      },
      onError: () => NotifyUtils.simpleFailed('Gửi lại mã xác nhận không thành công'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (userId) {
      const requestBody: RegistrationRequest = {
        userId: userId,
        token: formValues.token,
      };

      confirmRegistrationApi.mutate(requestBody);
    }
  });

  const handleResendTokenButton = () => {
    if (userId) {
      modals.openConfirmModal({
        size: 'xs',
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        closeOnClickOutside: false,
        closeOnConfirm: false,
        title: <strong>Gửi lại mã xác nhận</strong>,
        children: <Text size="sm">Bạn có muốn gửi lại mã xác nhận đến email đã nhập trước đó?</Text>,
        labels: {
          cancel: 'Đóng',
          confirm: 'Gửi',
        },
        confirmProps: { color: 'blue', disabled: resendRegistrationTokenApi.isLoading },
        onConfirm: () => resendRegistrationTokenApi.mutate({ userId: userId }),
      });
    }
  };

  const handleResendTokenWithNewEmailButton = () => {
    modals.openModal({
      size: 'md',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Thay đổi email</strong>,
      children: <ChangeEmailModal userId={userId}/>,
    });
  };

  return (
    <Card withBorder shadow="md" p={30} radius="md" sx={{ width: 500, margin: 'auto' }}>
      <Stack>
        <form onSubmit={handleFormSubmit}>
          <Stack>
            <TextInput
              required
              radius="md"
              label="Mã xác nhận"
              placeholder="Nhập mã xác nhận đã gửi"
              {...form.getInputProps('token')}
            />
            <Button
              radius="md"
              type="submit"
              disabled={MiscUtils.isEquals(initialFormValues, form.values) || confirmRegistrationApi.isLoading}
            >
              Xác nhận
            </Button>
          </Stack>
        </form>

        <Divider label="hoặc" labelPosition="center"/>

        <Button radius="md" variant="outline" onClick={handleResendTokenButton}>
          Gửi mã xác nhận lần nữa
        </Button>

        <Button radius="md" variant="outline" onClick={handleResendTokenWithNewEmailButton}>
          Gửi mã xác nhận lần nữa với email mới
        </Button>
      </Stack>
    </Card>
  );
}

function ClientSignupStepThree() {
  const theme = useMantineTheme();

  return (
    <Stack align="center" sx={{ alignItems: 'center', color: theme.colors.teal[6] }}>
      <Check size={100} strokeWidth={1}/>
      <Text weight={500}>Đã tạo tài khoản và xác nhận thành công!</Text>
      <Button radius="md" size="lg" mt="xl" component={Link} to="/signin">Đăng nhập</Button>
    </Stack>
  );
}

function ChangeEmailModal({ userId }: { userId: number | null }) {
  const modals = useModals();

  const initialFormValues = {
    email: '',
  };

  const formSchema = z.object({
    email: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' })
      .email({ message: 'Nhập email đúng định dạng' }),
  });

  const form = useForm({
    initialValues: initialFormValues,
    schema: zodResolver(formSchema),
  });

  const changeRegistrationEmailApi = useMutation<Empty, ErrorMessage, { userId: number, email: string }>(
    (request) => FetchUtils.put(
      ResourceURL.CLIENT_REGISTRATION_CHANGE_EMAIL(request.userId),
      {},
      { email: request.email }
    ),
    {
      onSuccess: () => {
        NotifyUtils.simpleSuccess('Đã đổi email thành công và đã gửi lại mã xác nhận mới');
        modals.closeAll();
      },
      onError: () => NotifyUtils.simpleFailed('Thay đổi email không thành công'),
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (userId) {
      changeRegistrationEmailApi.mutate({ userId: userId, email: formValues.email });
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack>
        <TextInput
          data-autofocus
          required
          radius="md"
          label="Email mới"
          placeholder="Nhập email mới"
          {...form.getInputProps('email')}
        />
        <Group position="right">
          <Button radius="md" variant="default" onClick={modals.closeAll}>
            Đóng
          </Button>
          <Button
            radius="md"
            type="submit"
            disabled={MiscUtils.isEquals(initialFormValues, form.values) || changeRegistrationEmailApi.isLoading}
          >
            Thay đổi và Gửi
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default ClientSignup;
