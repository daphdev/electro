import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import TagConfigs from 'pages/tag/TagConfigs';
import { TagRequest, TagResponse } from 'models/Tag';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useTagUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: TagConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(TagConfigs.createUpdateFormSchema),
  });

  const [tag, setTag] = useState<TagResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<TagRequest, TagResponse>(TagConfigs.resourceUrl, TagConfigs.resourceKey, id);
  useGetByIdApi<TagResponse>(TagConfigs.resourceUrl, TagConfigs.resourceKey, id,
    (tagResponse) => {
      setTag(tagResponse);
      const formValues: typeof form.values = {
        name: tagResponse.name,
        slug: tagResponse.slug,
        status: String(tagResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: TagRequest = {
        name: formValues.name,
        slug: formValues.slug,
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
    tag,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useTagUpdateViewModel;
