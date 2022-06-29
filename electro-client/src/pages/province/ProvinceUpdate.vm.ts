import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';

function useProvinceUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const [province, setProvince] = useState<ProvinceResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<ProvinceRequest, ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey, id);
  useGetByIdApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey, id,
    (provinceResponse) => {
      setProvince(provinceResponse);
      const formValues: typeof form.values = {
        name: provinceResponse.name,
        code: provinceResponse.code,
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: ProvinceRequest = {
        name: formValues.name,
        code: formValues.code,
      };
      updateApi.mutate(requestBody);
    }
  });

  return {
    province,
    form,
    handleFormSubmit,
  };
}

export default useProvinceUpdateViewModel;
