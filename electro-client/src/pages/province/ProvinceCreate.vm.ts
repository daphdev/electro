import { useForm, zodResolver } from '@mantine/form';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useGenericService from 'services/use-generic-service';
import { ProvinceRequest, ProvinceResponse } from 'models/Province';

export default function useProvinceCreateViewModel() {
  const provinceService = useGenericService<ProvinceRequest, ProvinceResponse>();

  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  const handleFormSubmit = form.onSubmit(formValues => {
    void provinceService.create(ProvinceConfigs.resourceUrl, formValues);
  });

  return { form, handleFormSubmit };
}
