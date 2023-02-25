import { useForm, zodResolver } from '@mantine/form';
import PromotionConfigs, { AddProductMode } from 'pages/promotion/PromotionConfigs';
import { PromotionRequest, PromotionResponse } from 'models/Promotion';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';
import { useState } from 'react';
import { CategoryResponse } from 'models/Category';
import { ProductResponse } from 'models/Product';

function usePromotionCreateViewModel() {
  const form = useForm({
    initialValues: PromotionConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(PromotionConfigs.createUpdateFormSchema),
  });

  const [addProductMode, setAddProductMode] = useState<AddProductMode>(AddProductMode.CATEGORY);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const createApi = useCreateApi<PromotionRequest, PromotionResponse>(PromotionConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    if (addProductMode === AddProductMode.CATEGORY && formValues.categoryIds.length === 0) {
      form.setFieldError('categoryIds', 'Cần thêm ít nhất 1 danh mục sản phẩm');
    } else if (addProductMode === AddProductMode.PRODUCT && formValues.productIds.length === 0) {
      form.setFieldError('productIds', 'Cần thêm ít nhất 1 sản phẩm');
    } else {
      const requestBody: PromotionRequest = {
        name: formValues.name,
        startDate: formValues.range[0]!.toISOString(),
        endDate: formValues.range[1]!.toISOString(),
        percent: formValues.percent,
        status: Number(formValues.status),
        productIds: formValues.productIds,
        categoryIds: formValues.categoryIds,
      };
      createApi.mutate(requestBody);
    }
  });

  const handleAddCategoryFinder = (categoryResponse: CategoryResponse) => {
    form.setFieldValue('categoryIds', [...form.values.categoryIds, categoryResponse.id]);
    setCategories(categories => [...categories, categoryResponse]);
  };

  const handleDeleteCategoryFinder = (categoryResponse: CategoryResponse) => {
    form.setFieldValue('categoryIds', form.values.categoryIds.filter(categoryId => categoryId !== categoryResponse.id));
    setCategories(categories => categories.filter(category => category.id !== categoryResponse.id));
  };

  const handleAddProductFinder = (productResponse: ProductResponse) => {
    form.setFieldValue('productIds', [...form.values.productIds, productResponse.id]);
    setProducts(products => [...products, productResponse]);
  };

  const handleDeleteProductFinder = (productResponse: ProductResponse) => {
    form.setFieldValue('productIds', form.values.productIds.filter(productId => productId !== productResponse.id));
    setProducts(products => products.filter(product => product.id !== productResponse.id));
  };

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
    setAddProductMode,
    categories, setCategories,
    handleAddCategoryFinder,
    handleDeleteCategoryFinder,
    products, setProducts,
    handleAddProductFinder,
    handleDeleteProductFinder,
  };
}

export default usePromotionCreateViewModel;
