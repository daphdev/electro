import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useCreateApi from 'hooks/use-create-api';

function useProvinceCreateViewModel() {
  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<ProvinceRequest, ProvinceResponse>(ProvinceConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: ProvinceRequest = {
      name: formValues.name,
      code: formValues.code,
    };
    createApi.mutate(requestBody);
  });

  return {
    form,
    handleFormSubmit,
  };
}

export default useProvinceCreateViewModel;
