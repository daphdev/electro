import { useForm, zodResolver } from '@mantine/form';
import JobLevelConfigs from 'pages/job-level/JobLevelConfigs';
import { JobLevelRequest, JobLevelResponse } from 'models/JobLevel';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useJobLevelCreateViewModel() {
  const form = useForm({
    initialValues: JobLevelConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobLevelConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<JobLevelRequest, JobLevelResponse>(JobLevelConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: JobLevelRequest = {
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

export default useJobLevelCreateViewModel;
