import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';
import useCreateApi from 'hooks/use-create-api';

function useProvinceCreateViewModel() {
  const createApi = useCreateApi<ProvinceRequest, ProvinceResponse>(ProvinceConfigs.resourceUrl);

  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const handleFormSubmit = form.onSubmit((formValues) => {
    createApi.mutate(formValues);
  });

  return {
    form,
    handleFormSubmit,
  };
}

export default useProvinceCreateViewModel;
