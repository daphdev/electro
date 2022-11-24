import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import DocketReasonConfigs from 'pages/docket-reason/DocketReasonConfigs';
import { DocketReasonRequest, DocketReasonResponse } from 'models/DocketReason';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useDocketReasonUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: DocketReasonConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DocketReasonConfigs.createUpdateFormSchema),
  });

  const [docketReason, setDocketReason] = useState<DocketReasonResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<DocketReasonRequest, DocketReasonResponse>(DocketReasonConfigs.resourceUrl, DocketReasonConfigs.resourceKey, id);
  useGetByIdApi<DocketReasonResponse>(DocketReasonConfigs.resourceUrl, DocketReasonConfigs.resourceKey, id,
    (docketReasonResponse) => {
      setDocketReason(docketReasonResponse);
      const formValues: typeof form.values = {
        name: docketReasonResponse.name,
        status: String(docketReasonResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: DocketReasonRequest = {
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
    docketReason,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useDocketReasonUpdateViewModel;
