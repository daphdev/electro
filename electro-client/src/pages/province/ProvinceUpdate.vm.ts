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
  const [_prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const getProvince = async (id: number) => {
    const { result } = await provinceService.getById(ProvinceConfigs.resourceUrl, id);
    if (result) {
      setProvince(result);
      const formValues = {
        name: result.name,
        code: result.code,
      };
      form.setValues(formValues);
    }
  };

  const handleFormSubmit = form.onSubmit(formValues => {
    setPrevFormValues(formValues);
    if (province && _prevFormValues && !_isEquals(_prevFormValues, formValues)) {
      void provinceService.update(ProvinceConfigs.resourceUrl, province.id, formValues);
    }
  });

  const _isEquals = (_prevFormValues: typeof form.values, formValues: typeof form.values) => {
    return JSON.stringify(_prevFormValues) === JSON.stringify(formValues);
  };

  return { province, getProvince, form, handleFormSubmit };
}
