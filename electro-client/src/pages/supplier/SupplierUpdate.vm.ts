import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { SupplierRequest, SupplierResponse } from 'models/Supplier';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { AddressRequest } from 'models/Address';

function useSupplierUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: SupplierConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(SupplierConfigs.createUpdateFormSchema),
  });

  const [supplier, setSupplier] = useState<SupplierResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);

  const updateApi = useUpdateApi<SupplierRequest, SupplierResponse>(SupplierConfigs.resourceUrl, SupplierConfigs.resourceKey, id);
  useGetByIdApi<SupplierResponse>(SupplierConfigs.resourceUrl, SupplierConfigs.resourceKey, id,
    (supplierResponse) => {
      setSupplier(supplierResponse);
      const formValues: typeof form.values = {
        displayName: supplierResponse.displayName,
        code: supplierResponse.code,
        contactFullname: supplierResponse.contactFullname || '',
        contactEmail: supplierResponse.contactEmail || '',
        contactPhone: supplierResponse.contactPhone || '',
        companyName: supplierResponse.companyName || '',
        taxCode: supplierResponse.taxCode || '',
        email: supplierResponse.email || '',
        phone: supplierResponse.phone || '',
        fax: supplierResponse.fax || '',
        website: supplierResponse.website || '',
        'address.line': supplierResponse.address?.line || '',
        'address.provinceId': supplierResponse.address?.province ? String(supplierResponse.address.province.id) : null,
        'address.districtId': supplierResponse.address?.district ? String(supplierResponse.address.district.id) : null,
        description: supplierResponse.description || '',
        note: supplierResponse.note || '',
        status: String(supplierResponse.status),
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
      const addressRequest: AddressRequest = {
        line: formValues['address.line'] || null,
        provinceId: Number(formValues['address.provinceId']) || null,
        districtId: Number(formValues['address.districtId']) || null,
        wardId: null,
      };
      const requestBody: SupplierRequest = {
        displayName: formValues.displayName,
        code: formValues.code,
        contactFullname: formValues.contactFullname || null,
        contactEmail: formValues.contactEmail || null,
        contactPhone: formValues.contactPhone || null,
        companyName: formValues.companyName || null,
        taxCode: formValues.taxCode || null,
        email: formValues.email || null,
        phone: formValues.phone || null,
        fax: formValues.fax || null,
        website: formValues.website || null,
        address: (supplier?.address === null && Object.values(addressRequest).every(value => value === null)) ? null : addressRequest,
        description: formValues.description || null,
        note: formValues.note || null,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Có hiệu lực',
    },
    {
      value: '2',
      label: 'Vô hiệu lực',
    },
  ];

  return {
    supplier,
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
  };
}

export default useSupplierUpdateViewModel;
