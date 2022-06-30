import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import PropertyConfigs from 'pages/property/PropertyConfigs';
import { PropertyRequest, PropertyResponse } from 'models/Property';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function usePropertyUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: PropertyConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(PropertyConfigs.createUpdateFormSchema),
  });

  const [property, setProperty] = useState<PropertyResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<PropertyRequest, PropertyResponse>(PropertyConfigs.resourceUrl, PropertyConfigs.resourceKey, id);
  useGetByIdApi<PropertyResponse>(PropertyConfigs.resourceUrl, PropertyConfigs.resourceKey, id,
    (propertyResponse) => {
      setProperty(propertyResponse);
      const formValues: typeof form.values = {
        name: propertyResponse.name,
        code: propertyResponse.code,
        description: propertyResponse.description || '',
        status: String(propertyResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: PropertyRequest = {
        name: formValues.name,
        code: formValues.code,
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
    property,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default usePropertyUpdateViewModel;
