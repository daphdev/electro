import { useForm, zodResolver } from '@mantine/form';
import PropertyConfigs from 'pages/property/PropertyConfigs';
import { PropertyRequest, PropertyResponse } from 'models/Property';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function usePropertyCreateViewModel() {
  const form = useForm({
    initialValues: PropertyConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(PropertyConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<PropertyRequest, PropertyResponse>(PropertyConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: PropertyRequest = {
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

export default usePropertyCreateViewModel;
