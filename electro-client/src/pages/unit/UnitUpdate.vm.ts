import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import UnitConfigs from 'pages/unit/UnitConfigs';
import { UnitRequest, UnitResponse } from 'models/Unit';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useUnitUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: UnitConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(UnitConfigs.createUpdateFormSchema),
  });

  const [unit, setUnit] = useState<UnitResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<UnitRequest, UnitResponse>(UnitConfigs.resourceUrl, UnitConfigs.resourceKey, id);
  useGetByIdApi<UnitResponse>(UnitConfigs.resourceUrl, UnitConfigs.resourceKey, id,
    (unitResponse) => {
      setUnit(unitResponse);
      const formValues: typeof form.values = {
        name: unitResponse.name,
        status: String(unitResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: UnitRequest = {
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
    unit,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useUnitUpdateViewModel;
