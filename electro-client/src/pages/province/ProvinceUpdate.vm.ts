import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';

export default function useProvinceUpdateViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const [province, setProvince] = useState<ProvinceResponse>();

  const getProvince = async (id: number) => {
    const { result } = await provinceService.getById(ProvinceConfigs.resourceUrl, id);
    if (result) {
      setProvince(result);
      form.setValues({
        name: result.name,
        code: result.code,
      });
    }
  };

  const handleFormSubmit = form.onSubmit(requestBody => {
    if (province) {
      void provinceService.update(ProvinceConfigs.resourceUrl, province.id, requestBody);
    }
  });

  return { province, getProvince, form, handleFormSubmit };
}
