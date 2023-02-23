import { useForm, zodResolver } from '@mantine/form';
import CountConfigs from 'pages/count/CountConfigs';
import { CountRequest, CountResponse } from 'models/Count';
import useCreateApi from 'hooks/use-create-api';
import { useState } from 'react';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { WarehouseResponse } from 'models/Warehouse';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { CountVariantRequest } from 'models/CountVariant';
import produce from 'immer';
import { VariantInventoryResponse } from 'models/VariantInventory';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import ResourceURL from 'constants/ResourceURL';

function useCountCreateViewModel() {
  const form = useForm({
    initialValues: CountConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CountConfigs.createUpdateFormSchema),
  });

  const [warehouseSelectList, setWarehouseSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const [variantIdForFetchInventory, setVariantIdForFetchInventory] = useState(0);

  const createApi = useCreateApi<CountRequest, CountResponse>(CountConfigs.resourceUrl);
  useGetAllApi<WarehouseResponse>(WarehouseConfigs.resourceUrl, WarehouseConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (warehouseListResponse) => {
      const selectList: SelectOption[] = warehouseListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setWarehouseSelectList(selectList);
    }
  );
  const { refetch } = useGetByIdApi<VariantInventoryResponse>(ResourceURL.VARIANT_INVENTORY, 'variant-inventories',
    variantIdForFetchInventory,
    (variantInventoryResponse) => {
      const countVariantRequest: CountVariantRequest = {
        variantId: variantInventoryResponse.variant.id,
        inventory: variantInventoryResponse.inventory,
        actualInventory: variantInventoryResponse.inventory,
      };
      const currentCountVariantRequests = [...form.values.countVariants, countVariantRequest];
      form.setFieldValue('countVariants', currentCountVariantRequests);
      setVariants(variants => [...variants, variantInventoryResponse.variant]);
      setVariantIdForFetchInventory(0); // Reset
    },
    { enabled: !!variantIdForFetchInventory }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: CountRequest = {
      code: formValues.code,
      warehouseId: Number(formValues.warehouseId),
      countVariants: formValues.countVariants,
      note: formValues.note || null,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
  });

  const handleClickVariantResultItem = (variant: VariantResponse) => {
    setTimeout(() => (variantIdForFetchInventory === variant.id)
      ? refetch() : setVariantIdForFetchInventory(variant.id), 100);
  };

  const handleActualInventoryInput = (actualInventory: number, index: number) => {
    const currentCountVariantRequests = produce(form.values.countVariants, draft => {
      const variant = draft[index];
      variant.actualInventory = actualInventory;
    });
    form.setFieldValue('countVariants', currentCountVariantRequests);
  };

  const handleDeleteVariantButton = (index: number) => {
    const currentCountVariantRequests = form.values.countVariants.filter((_, i) => i !== index);
    form.setFieldValue('countVariants', currentCountVariantRequests);
    setVariants(variants => variants.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    form.reset();
    setVariants([]);
  };

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Mới',
    },
    {
      value: '2',
      label: 'Đang xử lý',
    },
    {
      value: '3',
      label: 'Hoàn thành',
    },
    {
      value: '4',
      label: 'Hủy bỏ',
    },
  ];

  return {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleActualInventoryInput,
    handleDeleteVariantButton,
    resetForm,
    warehouseSelectList,
    statusSelectList,
    variants,
  };
}

export default useCountCreateViewModel;
