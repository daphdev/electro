import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import PurchaseOrderConfigs from 'pages/purchase-order/PurchaseOrderConfigs';
import { PurchaseOrderRequest, PurchaseOrderResponse } from 'models/PurchaseOrder';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { SupplierResponse } from 'models/Supplier';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { SelectOption } from 'types';
import { DestinationResponse } from 'models/Destination';
import DestinationConfigs from 'pages/destination/DestinationConfigs';
import { PurchaseOrderVariantKeyRequest, PurchaseOrderVariantRequest } from 'models/PurchaseOrderVariant';
import produce from 'immer';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';
import ResourceURL from 'constants/ResourceURL';

function usePurchaseOrderUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: PurchaseOrderConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(PurchaseOrderConfigs.createUpdateFormSchema),
  });

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrderResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const [supplierSelectList, setSupplierSelectList] = useState<SelectOption[]>([]);
  const [destinationSelectList, setDestinationSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const updateApi = useUpdateApi<PurchaseOrderRequest, PurchaseOrderResponse>(PurchaseOrderConfigs.resourceUrl, PurchaseOrderConfigs.resourceKey, id);
  useGetByIdApi<PurchaseOrderResponse>(PurchaseOrderConfigs.resourceUrl, PurchaseOrderConfigs.resourceKey, id,
    (purchaseOrderResponse) => {
      setPurchaseOrder(purchaseOrderResponse);
      const formValues: typeof form.values = {
        code: purchaseOrderResponse.code,
        supplierId: String(purchaseOrderResponse.supplier.id),
        purchaseOrderVariants: purchaseOrderResponse.purchaseOrderVariants
          .map(purchaseOrderVariantResponse => ({
            variantId: purchaseOrderVariantResponse.variant.id,
            cost: purchaseOrderVariantResponse.cost,
            quantity: purchaseOrderVariantResponse.quantity,
            amount: purchaseOrderVariantResponse.amount,
          })),
        destinationId: String(purchaseOrderResponse.destination.id),
        totalAmount: purchaseOrderResponse.totalAmount,
        note: purchaseOrderResponse.note || '',
        status: String(purchaseOrderResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      setVariants(purchaseOrderResponse.purchaseOrderVariants.map(purchaseOrderVariant => purchaseOrderVariant.variant));
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
  useGetAllApi<DestinationResponse>(DestinationConfigs.resourceUrl, DestinationConfigs.resourceKey,
    { all: 1 },
    (destinationListResponse) => {
      const selectList: SelectOption[] = destinationListResponse.content.map((item) => ({
        value: String(item.id),
        label: [item.address.line, item.address.district?.name, item.address.province?.name].filter(Boolean).join(', '),
      }));
      setDestinationSelectList(selectList);
    }
  );

  const deleteByIdsApi = useDeleteByIdsApi<PurchaseOrderVariantKeyRequest>(
    ResourceURL.PURCHASE_ORDER_VARIANT,
    'purchase-order-variants'
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (prevFormValues && !MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: PurchaseOrderRequest = {
        code: formValues.code,
        supplierId: Number(formValues.supplierId),
        purchaseOrderVariants: formValues.purchaseOrderVariants,
        destinationId: Number(formValues.destinationId),
        totalAmount: formValues.totalAmount,
        note: formValues.note || null,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);

      const deletedPurchaseOrderVariantKeyRequests: PurchaseOrderVariantKeyRequest[] = prevFormValues.purchaseOrderVariants
        .map(purchaseOrderVariantRequest => purchaseOrderVariantRequest.variantId)
        .filter(variantId => !formValues.purchaseOrderVariants.map(item => item.variantId).includes(variantId))
        .map(variantId => ({ purchaseOrderId: id, variantId: variantId }));

      if (deletedPurchaseOrderVariantKeyRequests.length > 0) {
        deleteByIdsApi.mutate(deletedPurchaseOrderVariantKeyRequests);
      }
    }
  });

  const calculateTotalAmount = (purchaseOrderVariantRequests: PurchaseOrderVariantRequest[]) =>
    purchaseOrderVariantRequests.map(item => item.amount).reduce((a, b) => a + b, 0);

  const handleClickVariantResultItem = (variant: VariantResponse) => {
    setTimeout(() => {
      const purchaseOrderVariantRequest: PurchaseOrderVariantRequest = {
        variantId: variant.id,
        cost: variant.cost,
        quantity: 1,
        amount: variant.cost,
      };
      const currentPurchaseOrderVariantRequests = [...form.values.purchaseOrderVariants, purchaseOrderVariantRequest];
      form.setFieldValue('purchaseOrderVariants', currentPurchaseOrderVariantRequests);
      form.setFieldValue('totalAmount', calculateTotalAmount(currentPurchaseOrderVariantRequests));
      setVariants(variants => [...variants, variant]);
    }, 100);
  };

  const handleQuantityInput = (quantity: number, index: number) => {
    const currentPurchaseOrderVariantRequests = produce(form.values.purchaseOrderVariants, draft => {
      const variant = draft[index];
      variant.quantity = quantity;
      variant.amount = variant.cost * quantity;
    });
    form.setFieldValue('purchaseOrderVariants', currentPurchaseOrderVariantRequests);
    form.setFieldValue('totalAmount', calculateTotalAmount(currentPurchaseOrderVariantRequests));
  };

  const handleDeleteVariantButton = (index: number) => {
    const currentPurchaseOrderVariantRequests = form.values.purchaseOrderVariants.filter((_, i) => i !== index);
    form.setFieldValue('purchaseOrderVariants', currentPurchaseOrderVariantRequests);
    form.setFieldValue('totalAmount', calculateTotalAmount(currentPurchaseOrderVariantRequests));
    setVariants(variants => variants.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    form.reset();
    setVariants([]);
  };

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Đơn hàng mới',
    },
    {
      value: '2',
      label: 'Đang chờ duyệt',
    },
    {
      value: '3',
      label: 'Đã duyệt',
    },
    {
      value: '4',
      label: 'Đang xử lý',
    },
    {
      value: '5',
      label: 'Hoàn thành',
    },
    {
      value: '6',
      label: 'Không duyệt',
    },
    {
      value: '7',
      label: 'Hủy bỏ',
    },
  ];

  return {
    purchaseOrder,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    resetForm,
    supplierSelectList,
    destinationSelectList,
    statusSelectList,
    variants,
  };
}

export default usePurchaseOrderUpdateViewModel;
