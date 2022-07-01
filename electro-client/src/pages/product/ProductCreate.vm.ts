import { useForm, zodResolver } from '@mantine/form';
import ProductConfigs from 'pages/product/ProductConfigs';
import { ProductRequest, ProductResponse } from 'models/Product';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';
import { useState } from 'react';
import useGetAllApi from 'hooks/use-get-all-api';
import { CategoryResponse } from 'models/Category';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import BrandConfigs from 'pages/brand/BrandConfigs';
import { BrandResponse } from 'models/Brand';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { SupplierResponse } from 'models/Supplier';
import { UnitResponse } from 'models/Unit';
import UnitConfigs from 'pages/unit/UnitConfigs';
import { TagResponse } from 'models/Tag';
import TagConfigs from 'pages/tag/TagConfigs';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import { GuaranteeResponse } from 'models/Guarantee';
import MiscUtils from 'utils/MiscUtils';

function useProductCreateViewModel() {
  const form = useForm({
    initialValues: ProductConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProductConfigs.createUpdateFormSchema),
  });

  const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([]);
  const [brandSelectList, setBrandSelectList] = useState<SelectOption[]>([]);
  const [supplierSelectList, setSupplierSelectList] = useState<SelectOption[]>([]);
  const [unitSelectList, setUnitSelectList] = useState<SelectOption[]>([]);
  const [tagSelectList, setTagSelectList] = useState<SelectOption[]>([]);
  const [guaranteeSelectList, setGuaranteeSelectList] = useState<SelectOption[]>([]);

  const createApi = useCreateApi<ProductRequest, ProductResponse>(ProductConfigs.resourceUrl);
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
  useGetAllApi<BrandResponse>(BrandConfigs.resourceUrl, BrandConfigs.resourceKey,
    { all: 1 },
    (brandListResponse) => {
      const selectList: SelectOption[] = brandListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setBrandSelectList(selectList);
    }
  );
  useGetAllApi<SupplierResponse>(SupplierConfigs.resourceUrl, SupplierConfigs.resourceKey,
    { all: 1 },
    (supplierListResponse) => {
      const selectList: SelectOption[] = supplierListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.displayName,
      }));
      setSupplierSelectList(selectList);
    }
  );
  useGetAllApi<UnitResponse>(UnitConfigs.resourceUrl, UnitConfigs.resourceKey,
    { all: 1 },
    (unitListResponse) => {
      const selectList: SelectOption[] = unitListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setUnitSelectList(selectList);
    }
  );
  useGetAllApi<TagResponse>(TagConfigs.resourceUrl, TagConfigs.resourceKey,
    { all: 1 },
    (tagListResponse) => {
      const selectList: SelectOption[] = tagListResponse.content.map((item) => ({
        value: String(item.id) + '#ORIGINAL',
        label: item.name,
      }));
      setTagSelectList(selectList);
    }
  );
  useGetAllApi<GuaranteeResponse>(GuaranteeConfigs.resourceUrl, GuaranteeConfigs.resourceKey,
    { all: 1 },
    (guaranteeListResponse) => {
      const selectList: SelectOption[] = guaranteeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setGuaranteeSelectList(selectList);
    }
  );

  const transformTags = (tags: string[]) => tags.map((tagIdOrName) => {
    if (tagIdOrName.includes('#ORIGINAL')) {
      return {
        id: Number(tagIdOrName.split('#')[0]),
      };
    } else {
      return {
        name: tagIdOrName.trim(),
        slug: MiscUtils.convertToSlug(tagIdOrName),
        status: 1,
      };
    }
  });

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: ProductRequest = {
      name: formValues.name,
      code: formValues.code,
      slug: formValues.slug,
      shortDescription: formValues.shortDescription || null,
      description: formValues.description || null,
      thumbnail: formValues.thumbnail || null,
      images: formValues.images,
      status: Number(formValues.status),
      categoryId: Number(formValues.categoryId) || null,
      brandId: Number(formValues.brandId) || null,
      supplierId: Number(formValues.supplierId) || null,
      unitId: Number(formValues.unitId) || null,
      tags: transformTags(formValues.tags),
      specifications: formValues.specifications,
      properties: formValues.properties,
      variants: formValues.variants,
      weight: formValues.weight || null,
      guaranteeId: Number(formValues.guaranteeId) || null,
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
    categorySelectList,
    brandSelectList,
    supplierSelectList,
    unitSelectList,
    tagSelectList,
    guaranteeSelectList,
  };
}

export default useProductCreateViewModel;
