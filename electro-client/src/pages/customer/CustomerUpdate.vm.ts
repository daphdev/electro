import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CustomerConfigs from 'pages/customer/CustomerConfigs';
import { CustomerRequest, CustomerResponse } from 'models/Customer';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { CustomerGroupResponse } from 'models/CustomerGroup';
import CustomerGroupConfigs from 'pages/customer-group/CustomerGroupConfigs';
import { CustomerStatusResponse } from 'models/CustomerStatus';
import CustomerStatusConfigs from 'pages/customer-status/CustomerStatusConfigs';
import { CustomerResourceResponse } from 'models/CustomerResource';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';
import { SelectOption } from 'types';

function useCustomerUpdateViewModel(id: number) {
  const updateApi = useUpdateApi<CustomerRequest, CustomerResponse>(CustomerConfigs.resourceUrl, CustomerConfigs.resourceKey, id);
  const { data: customerResponse } = useGetByIdApi<CustomerResponse>(CustomerConfigs.resourceUrl, CustomerConfigs.resourceKey, id);
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
  const { data: customerGroupListResponse } = useGetAllApi<CustomerGroupResponse>(
    CustomerGroupConfigs.resourceUrl,
    CustomerGroupConfigs.resourceKey,
    { all: 1 }
  );
  const { data: customerStatusListResponse } = useGetAllApi<CustomerStatusResponse>(
    CustomerStatusConfigs.resourceUrl,
    CustomerStatusConfigs.resourceKey,
    { all: 1 }
  );
  const { data: customerResourceListResponse } = useGetAllApi<CustomerResourceResponse>(
    CustomerResourceConfigs.resourceUrl,
    CustomerResourceConfigs.resourceKey,
    { all: 1 }
  );

  const [customer, setCustomer] = useState<CustomerResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>();
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>();
  const [customerGroupSelectList, setCustomerGroupSelectList] = useState<SelectOption[]>();
  const [customerStatusSelectList, setCustomerStatusSelectList] = useState<SelectOption[]>();
  const [customerResourceSelectList, setCustomerResourceSelectList] = useState<SelectOption[]>();

  const form = useForm({
    initialValues: CustomerConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CustomerConfigs.createUpdateFormSchema),
  });

  if (!customer && customerResponse) {
    setCustomer(customerResponse);
    const formValues: typeof form.values = {
      'user.username': customerResponse.user.username,
      'user.password': '',
      'user.fullname': customerResponse.user.fullname,
      'user.email': customerResponse.user.email,
      'user.phone': customerResponse.user.phone,
      'user.gender': customerResponse.user.gender,
      'user.address.line': customerResponse.user.address.line || '',
      'user.address.provinceId': customerResponse.user.address.province ? String(customerResponse.user.address.province.id) : '',
      'user.address.districtId': customerResponse.user.address.district ? String(customerResponse.user.address.district.id) : '',
      'user.avatar': customerResponse.user.avatar || '',
      'user.status': String(customerResponse.user.status),
      'user.roles': ['CUSTOMER'],
      customerGroupId: String(customerResponse.customerGroup.id),
      customerStatusId: String(customerResponse.customerStatus.id),
      customerResourceId: String(customerResponse.customerResource.id),
    };
    form.setValues(formValues);
    setPrevFormValues(formValues);
  }

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

  if (!customerGroupSelectList && customerGroupListResponse) {
    const selectList: SelectOption[] = customerGroupListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setCustomerGroupSelectList(selectList);
  }

  if (!customerStatusSelectList && customerStatusListResponse) {
    const selectList: SelectOption[] = customerStatusListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setCustomerStatusSelectList(selectList);
  }

  if (!customerResourceSelectList && customerResourceListResponse) {
    const selectList: SelectOption[] = customerResourceListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setCustomerResourceSelectList(selectList);
  }

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CustomerRequest = {
        user: {
          username: formValues['user.username'],
          password: formValues['user.password'] || null,
          fullname: formValues['user.fullname'],
          email: formValues['user.email'],
          phone: formValues['user.phone'],
          gender: formValues['user.gender'],
          address: {
            line: formValues['user.address.line'],
            provinceId: Number(formValues['user.address.provinceId']),
            districtId: Number(formValues['user.address.districtId']),
          },
          avatar: formValues['user.avatar'].trim() || null,
          status: Number(formValues['user.status']),
          roles: [{ id: 3 }],
        },
        customerGroupId: Number(formValues.customerGroupId),
        customerStatusId: Number(formValues.customerStatusId),
        customerResourceId: Number(formValues.customerResourceId),
      };
      updateApi.mutate(requestBody);
    }
  });

  const userGenderSelectList: SelectOption[] = [
    {
      value: 'M',
      label: 'Nam',
    },
    {
      value: 'F',
      label: 'Nữ',
    },
  ];

  const userStatusSelectList: SelectOption[] = [
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

  const userRoleSelectList: SelectOption[] = [
    {
      value: 'CUSTOMER',
      label: 'Khách hàng',
    },
  ];

  return {
    customer,
    form,
    handleFormSubmit,
    userGenderSelectList,
    provinceSelectList,
    districtSelectList,
    userStatusSelectList,
    userRoleSelectList,
    customerGroupSelectList,
    customerStatusSelectList,
    customerResourceSelectList,
  };
}

export default useCustomerUpdateViewModel;
