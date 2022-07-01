import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import BrandConfigs from 'pages/brand/BrandConfigs';
import { BrandRequest, BrandResponse } from 'models/Brand';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useBrandUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: BrandConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(BrandConfigs.createUpdateFormSchema),
  });

  const [brand, setBrand] = useState<BrandResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<BrandRequest, BrandResponse>(BrandConfigs.resourceUrl, BrandConfigs.resourceKey, id);
  useGetByIdApi<BrandResponse>(BrandConfigs.resourceUrl, BrandConfigs.resourceKey, id,
    (brandResponse) => {
      setBrand(brandResponse);
      const formValues: typeof form.values = {
        name: brandResponse.name,
        code: brandResponse.code,
        description: brandResponse.description || '',
        status: String(brandResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: BrandRequest = {
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
    brand,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useBrandUpdateViewModel;
