import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import JobTitleConfigs from 'pages/job-title/JobTitleConfigs';
import { JobTitleRequest, JobTitleResponse } from 'models/JobTitle';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useJobTitleUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: JobTitleConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobTitleConfigs.createUpdateFormSchema),
  });

  const [jobType, setJobTitle] = useState<JobTitleResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<JobTitleRequest, JobTitleResponse>(JobTitleConfigs.resourceUrl, JobTitleConfigs.resourceKey, id);
  useGetByIdApi<JobTitleResponse>(JobTitleConfigs.resourceUrl, JobTitleConfigs.resourceKey, id,
    (jobTypeResponse) => {
      setJobTitle(jobTypeResponse);
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
      const requestBody: JobTitleRequest = {
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

export default useJobTitleUpdateViewModel;
