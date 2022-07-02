import { useForm, zodResolver } from '@mantine/form';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import { GuaranteeRequest, GuaranteeResponse } from 'models/Guarantee';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useGuaranteeCreateViewModel() {
  const form = useForm({
    initialValues: GuaranteeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(GuaranteeConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<GuaranteeRequest, GuaranteeResponse>(GuaranteeConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: GuaranteeRequest = {
      name: formValues.name,
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

export default useGuaranteeCreateViewModel;
