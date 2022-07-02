import { useForm, zodResolver } from '@mantine/form';
import DepartmentConfigs from 'pages/department/DepartmentConfigs';
import { DepartmentRequest, DepartmentResponse } from 'models/Department';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useDepartmentCreateViewModel() {
  const form = useForm({
    initialValues: DepartmentConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DepartmentConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<DepartmentRequest, DepartmentResponse>(DepartmentConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: DepartmentRequest = {
      name: formValues.name,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Đang hoạt động',
    },
    {
      value: '2',
      label: 'Ít hoạt động',
    },
    {
      value: '3',
      label: 'Không hoạt động',
    },
  ];

  return {
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useDepartmentCreateViewModel;
