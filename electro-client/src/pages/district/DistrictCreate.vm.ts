import { useEffect, useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import useGenericService from 'services/use-generic-service';
import { DistrictRequest, DistrictResponse } from 'models/District';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { SelectOption } from 'types';

function useDistrictCreateViewModel() {
  const districtService = useGenericService<DistrictRequest, DistrictResponse>();
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>();

  useEffect(() => {
    const fetchAndSetProvinceSelectList = async () => {
      if (!provinceSelectList) {
        const { data } = await provinceService.getAll(ProvinceConfigs.resourceUrl, { all: 1 });
        if (data) {
          const selectList: SelectOption[] = data.content.map((item) => ({
            value: String(item.id),
            label: item.name,
          }));
          setProvinceSelectList(selectList);
        }
      }
    };

    void fetchAndSetProvinceSelectList();
  }, [provinceSelectList, provinceService]);

  const form = useForm({
    initialValues: DistrictConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DistrictConfigs.createUpdateFormSchema),
  });

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: DistrictRequest = {
      name: formValues.name,
      code: formValues.code,
      provinceId: Number(formValues.provinceId),
    };
    void districtService.create(DistrictConfigs.resourceUrl, requestBody);
  });

  return {
    form,
    handleFormSubmit,
    provinceSelectList,
  };
}

export default useDistrictCreateViewModel;
