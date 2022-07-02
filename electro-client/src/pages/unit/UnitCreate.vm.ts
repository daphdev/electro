import { useForm, zodResolver } from '@mantine/form';
import UnitConfigs from 'pages/unit/UnitConfigs';
import { UnitRequest, UnitResponse } from 'models/Unit';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useUnitCreateViewModel() {
  const form = useForm({
    initialValues: UnitConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(UnitConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<UnitRequest, UnitResponse>(UnitConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: UnitRequest = {
      name: formValues.name,
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

export default useUnitCreateViewModel;
