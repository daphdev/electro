import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import ProductConfigs from 'pages/product/ProductConfigs';
import { ImageItem, ProductRequest, ProductResponse } from 'models/Product';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { CollectionWrapper, SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { CategoryResponse } from 'models/Category';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import { BrandResponse } from 'models/Brand';
import BrandConfigs from 'pages/brand/BrandConfigs';
import { SupplierResponse } from 'models/Supplier';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { UnitResponse } from 'models/Unit';
import UnitConfigs from 'pages/unit/UnitConfigs';
import { TagResponse } from 'models/Tag';
import TagConfigs from 'pages/tag/TagConfigs';
import { GuaranteeResponse } from 'models/Guarantee';
import GuaranteeConfigs from 'pages/guarantee/GuaranteeConfigs';
import { useQueryClient } from 'react-query';
import useUploadMultipleImagesApi from 'hooks/use-upload-multiple-images-api';

function useProductUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: ProductConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProductConfigs.createUpdateFormSchema),
  });

  const [product, setProduct] = useState<ProductResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
  const [categorySelectList, setCategorySelectList] = useState<SelectOption[]>([]);
  const [brandSelectList, setBrandSelectList] = useState<SelectOption[]>([]);
  const [supplierSelectList, setSupplierSelectList] = useState<SelectOption[]>([]);
  const [unitSelectList, setUnitSelectList] = useState<SelectOption[]>([]);
  const [tagSelectList, setTagSelectList] = useState<SelectOption[]>([]);
  const [guaranteeSelectList, setGuaranteeSelectList] = useState<SelectOption[]>([]);
  const [imageFiles, setImageFiles] = useState<(File & { preview: string })[]>([]);
  const [thumbnailName, setThumbnailName] = useState('');

  const queryClient = useQueryClient();
  const updateApi = useUpdateApi<ProductRequest, ProductResponse>(ProductConfigs.resourceUrl, ProductConfigs.resourceKey, id);
  const uploadMultipleImagesApi = useUploadMultipleImagesApi();
  useGetByIdApi<ProductResponse>(ProductConfigs.resourceUrl, ProductConfigs.resourceKey, id,
    async (productResponse) => {
      await queryClient.invalidateQueries([TagConfigs.resourceKey, 'getAll']);
      setProduct(productResponse);
      const formValues: typeof form.values = {
        name: productResponse.name,
        code: productResponse.code,
        slug: productResponse.slug,
        shortDescription: productResponse.shortDescription || '',
        description: productResponse.description || '',
        thumbnail: productResponse.thumbnail || '',
        images: productResponse.images,
        status: String(productResponse.status),
        categoryId: productResponse.category ? String(productResponse.category.id) : null,
        brandId: productResponse.brand ? String(productResponse.brand.id) : null,
        supplierId: productResponse.supplier ? String(productResponse.supplier.id) : null,
        unitId: productResponse.unit ? String(productResponse.unit.id) : null,
        tags: productResponse.tags
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tag) => String(tag.id) + '#ORIGINAL'),
        specifications: productResponse.specifications,
        properties: productResponse.properties,
        variants: productResponse.variants,
        weight: productResponse.weight || 0.00,
        guaranteeId: productResponse.guarantee ? String(productResponse.guarantee.id) : null,
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      if (productResponse.thumbnail) {
        setThumbnailName(formValues.images?.content.find((image) => image.isThumbnail)?.name || '');
      }
    }
  );
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
      const selectList: SelectOption[] = tagListResponse.content
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
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
    const createProduct = (images?: CollectionWrapper<ImageItem>) => {
      setPrevFormValues(formValues);
      if (!MiscUtils.isEquals(formValues, prevFormValues) || imageFiles.length > 0) {
        const requestBody: ProductRequest = {
          name: formValues.name,
          code: formValues.code,
          slug: formValues.slug,
          shortDescription: formValues.shortDescription || null,
          description: formValues.description || null,
          thumbnail: images?.content.find((image) => image.name === thumbnailName)?.path
            || formValues.images?.content.find((image) => image.isThumbnail)?.path || null,
          images: images ? {
            content: (formValues.images?.content || []).concat(images.content.map((image) => (image.name === thumbnailName) ? {
              ...image,
              isThumbnail: true,
            } : image)),
            totalElements: (formValues.images?.totalElements || 0) + images.totalElements,
          } : formValues.images,
          status: Number(formValues.status),
          categoryId: Number(formValues.categoryId) || null,
          brandId: Number(formValues.brandId) || null,
          supplierId: Number(formValues.supplierId) || null,
          unitId: Number(formValues.unitId) || null,
          tags: transformTags(formValues.tags),
          specifications: formValues.specifications,
          properties: formValues.properties,
          variants: [],
          weight: formValues.weight || null,
          guaranteeId: Number(formValues.guaranteeId) || null,
        };
        updateApi.mutate(requestBody);
        setImageFiles([]);
      }
    };

    if (imageFiles.length > 0) {
      uploadMultipleImagesApi.mutate(imageFiles, {
        onSuccess: (imageCollectionResponse) => createProduct(imageCollectionResponse),
      });
    } else {
      createProduct();
    }
  });

  const resetForm = () => {
    form.reset();
    setImageFiles([]);
    setThumbnailName('');
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
    product,
    form,
    prevFormValues,
    handleFormSubmit,
    statusSelectList,
    categorySelectList,
    brandSelectList,
    supplierSelectList,
    unitSelectList,
    tagSelectList,
    guaranteeSelectList,
    imageFiles, setImageFiles,
    thumbnailName, setThumbnailName,
    resetForm,
  };
}

export default useProductUpdateViewModel;
