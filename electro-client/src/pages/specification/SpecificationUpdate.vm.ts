import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import SpecificationConfigs from 'pages/specification/SpecificationConfigs';
import { SpecificationRequest, SpecificationResponse } from 'models/Specification';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useSpecificationUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: SpecificationConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(SpecificationConfigs.createUpdateFormSchema),
  });

  const [specification, setSpecification] = useState<SpecificationResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<SpecificationRequest, SpecificationResponse>(SpecificationConfigs.resourceUrl, SpecificationConfigs.resourceKey, id);
  useGetByIdApi<SpecificationResponse>(SpecificationConfigs.resourceUrl, SpecificationConfigs.resourceKey, id,
    (specificationResponse) => {
      setSpecification(specificationResponse);
      const formValues: typeof form.values = {
        name: specificationResponse.name,
        code: specificationResponse.code,
        description: specificationResponse.description || '',
        status: String(specificationResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: SpecificationRequest = {
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
    specification,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useSpecificationUpdateViewModel;
