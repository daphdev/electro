import { useForm, zodResolver } from '@mantine/form';
import PurchaseOrderConfigs from 'pages/purchase-order/PurchaseOrderConfigs';
import { PurchaseOrderRequest, PurchaseOrderResponse } from 'models/PurchaseOrder';
import useCreateApi from 'hooks/use-create-api';
import { useState } from 'react';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { SupplierResponse } from 'models/Supplier';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import { DestinationResponse } from 'models/Destination';
import DestinationConfigs from 'pages/destination/DestinationConfigs';
import { VariantResponse } from 'models/Variant';
import { PurchaseOrderVariantRequest } from 'models/PurchaseOrderVariant';
import produce from 'immer';

function usePurchaseOrderCreateViewModel() {
  const form = useForm({
    initialValues: PurchaseOrderConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(PurchaseOrderConfigs.createUpdateFormSchema),
  });

  const [supplierSelectList, setSupplierSelectList] = useState<SelectOption[]>([]);
  const [destinationSelectList, setDestinationSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const createApi = useCreateApi<PurchaseOrderRequest, PurchaseOrderResponse>(PurchaseOrderConfigs.resourceUrl);
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

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: PurchaseOrderRequest = {
      code: formValues.code,
      supplierId: Number(formValues.supplierId),
      purchaseOrderVariants: formValues.purchaseOrderVariants,
      destinationId: Number(formValues.destinationId),
      totalAmount: formValues.totalAmount,
      note: formValues.note || null,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
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

export default usePurchaseOrderCreateViewModel;
