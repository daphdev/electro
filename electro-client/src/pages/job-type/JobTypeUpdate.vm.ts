import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import JobTypeConfigs from 'pages/job-type/JobTypeConfigs';
import { JobTypeRequest, JobTypeResponse } from 'models/JobType';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useJobTypeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: JobTypeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobTypeConfigs.createUpdateFormSchema),
  });

  const [jobType, setJobType] = useState<JobTypeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<JobTypeRequest, JobTypeResponse>(JobTypeConfigs.resourceUrl, JobTypeConfigs.resourceKey, id);
  useGetByIdApi<JobTypeResponse>(JobTypeConfigs.resourceUrl, JobTypeConfigs.resourceKey, id,
    (jobTypeResponse) => {
      setJobType(jobTypeResponse);
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
      const requestBody: JobTypeRequest = {
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

export default useJobTypeUpdateViewModel;
