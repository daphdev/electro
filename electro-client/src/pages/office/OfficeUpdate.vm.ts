import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import OfficeConfigs from 'pages/office/OfficeConfigs';
import { OfficeRequest, OfficeResponse } from 'models/Office';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { SelectOption } from 'types';

function useOfficeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: OfficeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OfficeConfigs.createUpdateFormSchema),
  });

  const [office, setOffice] = useState<OfficeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<OfficeRequest, OfficeResponse>(OfficeConfigs.resourceUrl, OfficeConfigs.resourceKey, id);
  useGetByIdApi<OfficeResponse>(OfficeConfigs.resourceUrl, OfficeConfigs.resourceKey, id,
    (officeResponse) => {
      setOffice(officeResponse);
      const formValues: typeof form.values = {
        name: officeResponse.name,
        'address.line': officeResponse.address.line || '',
        'address.provinceId': officeResponse.address.province ? String(officeResponse.address.province.id) : null,
        'address.districtId': officeResponse.address.district ? String(officeResponse.address.district.id) : null,
        status: String(officeResponse.status),
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

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: OfficeRequest = {
        name: formValues.name,
        address: {
          line: formValues['address.line'],
          provinceId: Number(formValues['address.provinceId']),
          districtId: Number(formValues['address.districtId']),
          wardId: null,
        },
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
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
    office,
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
  };
}

export default useOfficeUpdateViewModel;
