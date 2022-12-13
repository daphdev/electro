import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import DocketConfigs from 'pages/docket/DocketConfigs';
import { DocketRequest, DocketResponse } from 'models/Docket';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { DocketReasonResponse } from 'models/DocketReason';
import DocketReasonConfigs from 'pages/docket-reason/DocketReasonConfigs';
import { WarehouseResponse } from 'models/Warehouse';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { DocketVariantKeyRequest, DocketVariantRequest } from 'models/DocketVariant';
import produce from 'immer';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';
import ResourceURL from 'constants/ResourceURL';

function useDocketUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: DocketConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DocketConfigs.createUpdateFormSchema),
  });

  const [docket, setDocket] = useState<DocketResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const [reasonSelectList, setReasonSelectList] = useState<SelectOption[]>([]);
  const [warehouseSelectList, setWarehouseSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const updateApi = useUpdateApi<DocketRequest, DocketResponse>(DocketConfigs.resourceUrl, DocketConfigs.resourceKey, id);
  useGetByIdApi<DocketResponse>(DocketConfigs.resourceUrl, DocketConfigs.resourceKey, id,
    (docketResponse) => {
      setDocket(docketResponse);
      const formValues: typeof form.values = {
        type: String(docketResponse.type),
        code: docketResponse.code,
        reasonId: String(docketResponse.reason.id),
        warehouseId: String(docketResponse.warehouse.id),
        docketVariants: docketResponse.docketVariants
          .map(docketVariantResponse => ({
            variantId: docketVariantResponse.variant.id,
            quantity: docketVariantResponse.quantity,
          })),
        purchaseOrderId: docketResponse.purchaseOrder ? String(docketResponse.purchaseOrder.id) : null,
        orderId: docketResponse.order ? String(docketResponse.order.id) : null,
        note: docketResponse.note || '',
        status: String(docketResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      setVariants(docketResponse.docketVariants.map(docketVariant => docketVariant.variant));
    }
  );
  useGetAllApi<DocketReasonResponse>(DocketReasonConfigs.resourceUrl, DocketReasonConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (docketReasonListResponse) => {
      const selectList: SelectOption[] = docketReasonListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setReasonSelectList(selectList);
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

  const deleteByIdsApi = useDeleteByIdsApi<DocketVariantKeyRequest>(
    ResourceURL.DOCKET_VARIANT,
    'docket-variants'
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (prevFormValues && !MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: DocketRequest = {
        type: Number(formValues.type),
        code: formValues.code,
        reasonId: Number(formValues.reasonId),
        warehouseId: Number(formValues.warehouseId),
        docketVariants: formValues.docketVariants,
        purchaseOrderId: Number(formValues.purchaseOrderId) || null,
        orderId: Number(formValues.orderId) || null,
        note: formValues.note || null,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);

      const deletedDocketVariantKeyRequests: DocketVariantKeyRequest[] = prevFormValues.docketVariants
        .map(docketVariantRequest => docketVariantRequest.variantId)
        .filter(variantId => !formValues.docketVariants.map(item => item.variantId).includes(variantId))
        .map(variantId => ({ docketId: id, variantId: variantId }));

      if (deletedDocketVariantKeyRequests.length > 0) {
        deleteByIdsApi.mutate(deletedDocketVariantKeyRequests);
      }
    }
  });

  const handleClickVariantResultItem = (variant: VariantResponse) => {
    setTimeout(() => {
      const docketVariantRequest: DocketVariantRequest = {
        variantId: variant.id,
        quantity: 1,
      };
      const currentDocketVariantRequests = [...form.values.docketVariants, docketVariantRequest];
      form.setFieldValue('docketVariants', currentDocketVariantRequests);
      setVariants(variants => [...variants, variant]);
    }, 100);
  };

  const handleQuantityInput = (quantity: number, index: number) => {
    const currentDocketVariantRequests = produce(form.values.docketVariants, draft => {
      const variant = draft[index];
      variant.quantity = quantity;
    });
    form.setFieldValue('docketVariants', currentDocketVariantRequests);
  };

  const handleDeleteVariantButton = (index: number) => {
    const currentDocketVariantRequests = form.values.docketVariants.filter((_, i) => i !== index);
    form.setFieldValue('docketVariants', currentDocketVariantRequests);
    setVariants(variants => variants.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    form.reset();
    setVariants([]);
  };

  const typeSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Nhập',
    },
    {
      value: '2',
      label: 'Xuất',
    },
  ];

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
    docket,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    resetForm,
    reasonSelectList,
    warehouseSelectList,
    typeSelectList,
    statusSelectList,
    variants,
  };
}

export default useDocketUpdateViewModel;
