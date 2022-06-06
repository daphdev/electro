import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';

function useProvinceUpdateViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const [province, setProvince] = useState<ProvinceResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const getProvince = async (id?: string) => {
    if (id && !province) {
      const { data } = await provinceService.getById(ProvinceConfigs.resourceUrl, Number(id));
      if (data) {
        setProvince(data);
        const formValues = {
          name: data.name,
          code: data.code,
        };
        form.setValues(formValues);
        setPrevFormValues(formValues);
      }
    }
  };

  const handleFormSubmit = form.onSubmit(formValues => {
    setPrevFormValues(formValues);
    if (province && !isEquals(formValues, prevFormValues)) {
      void provinceService.update(ProvinceConfigs.resourceUrl, province.id, formValues);
    }
  });

  const isEquals = (formValues: typeof form.values, prevFormValues?: typeof form.values) => {
    return JSON.stringify(formValues) === JSON.stringify(prevFormValues);
  };

  return {
    province,
    getProvince,
    form,
    handleFormSubmit,
  };
}

export default useProvinceUpdateViewModel;
