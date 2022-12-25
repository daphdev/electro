import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import CountConfigs from 'pages/count/CountConfigs';
import { CountRequest, CountResponse } from 'models/Count';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { WarehouseResponse } from 'models/Warehouse';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { VariantInventoryResponse } from 'models/VariantInventory';
import ResourceURL from 'constants/ResourceURL';
import { CountVariantKeyRequest, CountVariantRequest } from 'models/CountVariant';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';
import produce from 'immer';

function useCountUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: CountConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(CountConfigs.createUpdateFormSchema),
  });

  const [count, setCount] = useState<CountResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const [warehouseSelectList, setWarehouseSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const [variantIdForFetchInventory, setVariantIdForFetchInventory] = useState(0);

  const updateApi = useUpdateApi<CountRequest, CountResponse>(CountConfigs.resourceUrl, CountConfigs.resourceKey, id);
  useGetByIdApi<CountResponse>(CountConfigs.resourceUrl, CountConfigs.resourceKey, id,
    (countResponse) => {
      setCount(countResponse);
      const formValues: typeof form.values = {
        code: countResponse.code,
        warehouseId: String(countResponse.warehouse.id),
        countVariants: countResponse.countVariants
          .map(countVariantResponse => ({
            variantId: countVariantResponse.variant.id,
            inventory: countVariantResponse.inventory,
            actualInventory: countVariantResponse.actualInventory,
          })),
        note: countResponse.note || '',
        status: String(countResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      setVariants(countResponse.countVariants.map(countVariant => countVariant.variant));
    }
  );
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

  const deleteByIdsApi = useDeleteByIdsApi<CountVariantKeyRequest>(
    ResourceURL.COUNT_VARIANT,
    'count-variants'
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (prevFormValues && !MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: CountRequest = {
        code: formValues.code,
        warehouseId: Number(formValues.warehouseId),
        countVariants: formValues.countVariants,
        note: formValues.note || null,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);

      const deletedCountVariantKeyRequests: CountVariantKeyRequest[] = prevFormValues.countVariants
        .map(countVariantRequest => countVariantRequest.variantId)
        .filter(variantId => !formValues.countVariants.map(item => item.variantId).includes(variantId))
        .map(variantId => ({ countId: id, variantId: variantId }));

      if (deletedCountVariantKeyRequests.length > 0) {
        deleteByIdsApi.mutate(deletedCountVariantKeyRequests);
      }
    }
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
    count,
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

export default useCountUpdateViewModel;
