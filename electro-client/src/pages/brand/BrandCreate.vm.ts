import { useForm, zodResolver } from '@mantine/form';
import BrandConfigs from 'pages/brand/BrandConfigs';
import { BrandRequest, BrandResponse } from 'models/Brand';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useBrandCreateViewModel() {
  const form = useForm({
    initialValues: BrandConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(BrandConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<BrandRequest, BrandResponse>(BrandConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: BrandRequest = {
      name: formValues.name,
      code: formValues.code,
      description: formValues.description || null,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
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
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useBrandCreateViewModel;
