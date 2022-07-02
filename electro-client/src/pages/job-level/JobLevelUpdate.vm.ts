import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import JobLevelConfigs from 'pages/job-level/JobLevelConfigs';
import { JobLevelRequest, JobLevelResponse } from 'models/JobLevel';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useJobLevelUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: JobLevelConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobLevelConfigs.createUpdateFormSchema),
  });

  const [jobType, setJobLevel] = useState<JobLevelResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<JobLevelRequest, JobLevelResponse>(JobLevelConfigs.resourceUrl, JobLevelConfigs.resourceKey, id);
  useGetByIdApi<JobLevelResponse>(JobLevelConfigs.resourceUrl, JobLevelConfigs.resourceKey, id,
    (jobTypeResponse) => {
      setJobLevel(jobTypeResponse);
      const formValues: typeof form.values = {
        name: jobTypeResponse.name,
        status: String(jobTypeResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: JobLevelRequest = {
        name: formValues.name,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
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
    jobType,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useJobLevelUpdateViewModel;
