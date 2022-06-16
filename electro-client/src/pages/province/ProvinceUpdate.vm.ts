import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import useUpdateApi from 'hooks/use-update-api';
import MiscUtils from 'utils/MiscUtils';

function useProvinceUpdateViewModel(id: number) {
  const [province, setProvince] = useState<ProvinceResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const { data } = useGetByIdApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey, id);
  const updateApi = useUpdateApi<ProvinceRequest, ProvinceResponse>(ProvinceConfigs.resourceUrl, id);

  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  if (!province && data) {
    setProvince(data);
    const formValues = {
      name: data.name,
      code: data.code,
    };
    form.setValues(formValues);
    setPrevFormValues(formValues);
  }

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      updateApi.mutate(formValues);
    }
  });

  return {
    province,
    form,
    handleFormSubmit,
  };
}

export default useProvinceUpdateViewModel;
