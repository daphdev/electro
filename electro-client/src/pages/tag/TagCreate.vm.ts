import { useForm, zodResolver } from '@mantine/form';
import TagConfigs from 'pages/tag/TagConfigs';
import { TagRequest, TagResponse } from 'models/Tag';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useTagCreateViewModel() {
  const form = useForm({
    initialValues: TagConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(TagConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<TagRequest, TagResponse>(TagConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: TagRequest = {
      name: formValues.name,
      slug: formValues.slug,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
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
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useTagCreateViewModel;
