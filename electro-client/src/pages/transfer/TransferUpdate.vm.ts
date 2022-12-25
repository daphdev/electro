import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import TransferConfigs from 'pages/transfer/TransferConfigs';
import { TransferRequest, TransferResponse } from 'models/Transfer';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { WarehouseResponse } from 'models/Warehouse';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';
import { DocketVariantKeyRequest, DocketVariantRequest } from 'models/DocketVariant';
import ResourceURL from 'constants/ResourceURL';
import produce from 'immer';

function useTransferUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: TransferConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(TransferConfigs.createUpdateFormSchema),
  });

  const [transfer, setTransfer] = useState<TransferResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const [warehouseSelectList, setWarehouseSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const updateApi = useUpdateApi<TransferRequest, TransferResponse>(TransferConfigs.resourceUrl, TransferConfigs.resourceKey, id);
  useGetByIdApi<TransferResponse>(TransferConfigs.resourceUrl, TransferConfigs.resourceKey, id,
    (transferResponse) => {
      setTransfer(transferResponse);
      const formValues: typeof form.values = {
        code: transferResponse.code,
        'exportDocket.warehouseId': String(transferResponse.exportDocket.warehouse.id),
        'importDocket.warehouseId': String(transferResponse.importDocket.warehouse.id),
        docketVariants: transferResponse.exportDocket.docketVariants
          .map(docketVariantResponse => ({
            variantId: docketVariantResponse.variant.id,
            quantity: docketVariantResponse.quantity,
          })),
        note: transferResponse.note || '',
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      setVariants(transferResponse.exportDocket.docketVariants.map(docketVariant => docketVariant.variant));
      const selectedWarehouseIds = [transferResponse.exportDocket.warehouse.id, transferResponse.importDocket.warehouse.id];
      setWarehouseSelectList(warehouseSelectList
        .map(option => ({ ...option, disabled: selectedWarehouseIds.includes(Number(option.value)) })));
    }
  );
  useGetAllApi<WarehouseResponse>(WarehouseConfigs.resourceUrl, WarehouseConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (warehouseListResponse) => {
      const selectedWarehouseIds = [transfer?.exportDocket.warehouse.id, transfer?.importDocket.warehouse.id];
      const selectList: SelectOption[] = warehouseListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
        disabled: selectedWarehouseIds.includes(item.id),
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
    if (transfer && prevFormValues && !MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: TransferRequest = {
        code: formValues.code.trim(),
        exportDocket: {
          type: transfer.exportDocket.type, // conserve
          code: 'EX-' + formValues.code.trim(),
          reasonId: transfer.exportDocket.reason.id, // conserve
          warehouseId: Number(formValues['exportDocket.warehouseId']),
          docketVariants: formValues.docketVariants,
          purchaseOrderId: null, // forced
          orderId: null, // forced
          note: transfer.exportDocket.note, // conserve
          status: transfer.exportDocket.status, // conserve
        },
        importDocket: {
          type: transfer.importDocket.type, // conserve
          code: 'IM-' + formValues.code.trim(),
          reasonId: transfer.importDocket.reason.id, // conserve
          warehouseId: Number(formValues['importDocket.warehouseId']),
          docketVariants: formValues.docketVariants,
          purchaseOrderId: null, // forced
          orderId: null, // forced
          note: transfer.importDocket.note, // conserve
          status: transfer.importDocket.status, // conserve
        },
        note: formValues.note || null,
      };
      updateApi.mutate(requestBody);

      const docketIds = [transfer.exportDocket.id, transfer.importDocket.id];

      const deletedDocketVariantKeyRequests: DocketVariantKeyRequest[] = prevFormValues.docketVariants
        .map(docketVariantRequest => docketVariantRequest.variantId)
        .filter(variantId => !formValues.docketVariants.map(item => item.variantId).includes(variantId))
        .flatMap(variantId => docketIds.map(docketId => ({ docketId: docketId, variantId: variantId })));

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

  const handleWarehouseSelectList = (value: string | null, type: 'export' | 'import') => {
    const formKey = (type === 'export') ? 'exportDocket.warehouseId' : 'importDocket.warehouseId';
    form.setFieldValue(formKey, value);
    setWarehouseSelectList(warehouseSelectList.map(option => {
      if (option.disabled === true && option.value === form.values[formKey]) {
        return { ...option, disabled: false };
      }
      if (option.value === value) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const resetForm = () => {
    form.reset();
    setVariants([]);
    setWarehouseSelectList(warehouseSelectList.map(option => ({ ...option, disabled: false })));
  };

  return {
    transfer,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleWarehouseSelectList,
    resetForm,
    warehouseSelectList,
    variants,
  };
}

export default useTransferUpdateViewModel;
