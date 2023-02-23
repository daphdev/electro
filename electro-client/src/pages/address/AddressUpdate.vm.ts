import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import AddressConfigs from 'pages/address/AddressConfigs';
import { AddressRequest, AddressResponse } from 'models/Address';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { SelectOption } from 'types';

function useAddressUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: AddressConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(AddressConfigs.createUpdateFormSchema),
  });

  const [address, setAddress] = useState<AddressResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<AddressRequest, AddressResponse>(AddressConfigs.resourceUrl, AddressConfigs.resourceKey, id);
  useGetByIdApi<AddressResponse>(AddressConfigs.resourceUrl, AddressConfigs.resourceKey, id,
    (addressResponse) => {
      setAddress(addressResponse);
      const formValues: typeof form.values = {
        line: addressResponse.line || '',
        provinceId: addressResponse.province ? String(addressResponse.province.id) : null,
        districtId: addressResponse.district ? String(addressResponse.district.id) : null,
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
      const requestBody: AddressRequest = {
        line: formValues.line || null,
        provinceId: Number(formValues.provinceId) || null,
        districtId: Number(formValues.districtId) || null,
        wardId: null,
      };
      updateApi.mutate(requestBody);
    }
  });

  return {
    address,
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
  };
}

export default useAddressUpdateViewModel;
