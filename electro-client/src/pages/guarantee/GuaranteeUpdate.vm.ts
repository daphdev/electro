import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import { GuaranteeRequest, GuaranteeResponse } from 'models/Guarantee';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useGuaranteeUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: GuaranteeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(GuaranteeConfigs.createUpdateFormSchema),
  });

  const [guarantee, setGuarantee] = useState<GuaranteeResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<GuaranteeRequest, GuaranteeResponse>(GuaranteeConfigs.resourceUrl, GuaranteeConfigs.resourceKey, id);
  useGetByIdApi<GuaranteeResponse>(GuaranteeConfigs.resourceUrl, GuaranteeConfigs.resourceKey, id,
    (guaranteeResponse) => {
      setGuarantee(guaranteeResponse);
      const formValues: typeof form.values = {
        name: guaranteeResponse.name,
        description: guaranteeResponse.description || '',
        status: String(guaranteeResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: GuaranteeRequest = {
        name: formValues.name,
        description: formValues.description || null,
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
    guarantee,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useGuaranteeUpdateViewModel;
