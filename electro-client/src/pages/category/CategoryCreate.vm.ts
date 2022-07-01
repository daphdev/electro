import { useForm, zodResolver } from '@mantine/form';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import { CategoryRequest, CategoryResponse } from 'models/Category';
import useCreateApi from 'hooks/use-create-api';
import useGetAllApi from 'hooks/use-get-all-api';
import { useState } from 'react';
import { SelectOption } from 'types';
import { useQueryClient } from 'react-query';

function useCategoryCreateViewModel() {
  const form = useForm({
    initialValues: CategoryConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CategoryConfigs.createUpdateFormSchema),
  });

  const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([]);

  const queryClient = useQueryClient();
  const createApi = useCreateApi<CategoryRequest, CategoryResponse>(CategoryConfigs.resourceUrl);
  useGetAllApi<CategoryResponse>(CategoryConfigs.resourceUrl, CategoryConfigs.resourceKey,
    { all: 1 },
    (categoryListResponse) => {
      const selectList: SelectOption[] = categoryListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.parentCategory ? item.name + ' ← ' + item.parentCategory.name : item.name,
      }));
      setCategorySelectList(selectList);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CategoryRequest = {
      name: formValues.name,
      slug: formValues.slug,
      description: formValues.description || null,
      thumbnail: formValues.thumbnail || null,
      parentCategoryId: Number(formValues.parentCategoryId) || null,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody, {
      onSuccess: () => queryClient.invalidateQueries([CategoryConfigs.resourceKey, 'getAll']),
    });
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
    categorySelectList,
    statusSelectList,
  };
}

export default useCategoryCreateViewModel;
