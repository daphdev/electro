import { useForm, zodResolver } from '@mantine/form';
import OfficeConfigs from 'pages/office/OfficeConfigs';
import { OfficeRequest, OfficeResponse } from 'models/Office';
import useCreateApi from 'hooks/use-create-api';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { useState } from 'react';
import { SelectOption } from 'types';

function useOfficeCreateViewModel() {
  const createApi = useCreateApi<OfficeRequest, OfficeResponse>(OfficeConfigs.resourceUrl);
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

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>();
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>();

  const form = useForm({
    initialValues: OfficeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OfficeConfigs.createUpdateFormSchema),
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

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: OfficeRequest = {
      name: formValues.name,
      address: {
        line: formValues['address.line'],
        provinceId: Number(formValues['address.provinceId']),
        districtId: Number(formValues['address.districtId']),
      },
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
  });

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
    provinceSelectList,
    districtSelectList,
    statusSelectList,
  };
}

export default useOfficeCreateViewModel;
