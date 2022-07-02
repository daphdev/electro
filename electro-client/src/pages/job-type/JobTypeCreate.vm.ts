import { useForm, zodResolver } from '@mantine/form';
import JobTypeConfigs from 'pages/job-type/JobTypeConfigs';
import { JobTypeRequest, JobTypeResponse } from 'models/JobType';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useJobTypeCreateViewModel() {
  const form = useForm({
    initialValues: JobTypeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobTypeConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<JobTypeRequest, JobTypeResponse>(JobTypeConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: JobTypeRequest = {
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

export default useJobTypeCreateViewModel;
