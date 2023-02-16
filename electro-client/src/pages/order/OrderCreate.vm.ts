import { useForm, zodResolver } from '@mantine/form';
import OrderConfigs from 'pages/order/OrderConfigs';
import { OrderRequest, OrderResponse } from 'models/Order';
import useCreateApi from 'hooks/use-create-api';
import { useState } from 'react';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderResourceResponse } from 'models/OrderResource';
import { OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import OrderCancellationReasonConfigs from 'pages/order-cancellation-reason/OrderCancellationReasonConfigs';
import { OrderVariantRequest } from 'models/OrderVariant';
import produce from 'immer';

function useOrderCreateViewModel() {
  const form = useForm({
    initialValues: OrderConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderConfigs.createUpdateFormSchema),
  });

  const [orderResourceSelectList, setOrderResourceSelectList] = useState<SelectOption[]>([]);
  const [orderCancellationReasonSelectList, setOrderCancellationReasonSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const createApi = useCreateApi<OrderRequest, OrderResponse>(OrderConfigs.resourceUrl);
  useGetAllApi<OrderResourceResponse>(OrderResourceConfigs.resourceUrl, OrderResourceConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (orderResourceListResponse) => {
      const selectList: SelectOption[] = orderResourceListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setOrderResourceSelectList(selectList);
    }
  );
  useGetAllApi<OrderCancellationReasonResponse>(OrderCancellationReasonConfigs.resourceUrl, OrderCancellationReasonConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (orderCancellationReasonListResponse) => {
      const selectList: SelectOption[] = orderCancellationReasonListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setOrderCancellationReasonSelectList(selectList);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: OrderRequest = {
      code: formValues.code,
      status: Number(formValues.status),
      toName: formValues.toName,
      toPhone: formValues.toPhone,
      toAddress: formValues.toAddress,
      toWardName: formValues.toWardName,
      toDistrictName: formValues.toDistrictName,
      toProvinceName: formValues.toProvinceName,
      orderResourceId: Number(formValues.orderResourceId),
      orderCancellationReasonId: Number(formValues.orderCancellationReasonId) || null,
      note: formValues.note || null,
      userId: Number(formValues.userId),
      orderVariants: formValues.orderVariants,
      totalAmount: formValues.totalAmount,
      tax: formValues.tax,
      shippingCost: formValues.shippingCost,
      totalPay: formValues.totalPay,
    };
    createApi.mutate(requestBody);
  });

  const calculateTotalAmount = (orderVariantRequests: OrderVariantRequest[]) =>
    orderVariantRequests.map(item => item.amount).reduce((a, b) => a + b, 0);

  const calculateTotalPayByTotalAmount = (totalAmount: number) => {
    return Number((totalAmount + totalAmount * form.values.tax + form.values.shippingCost).toFixed(0));
  };

  const calculateTotalPayByShippingCost = (shippingCost: number) => {
    return Number((form.values.totalAmount + form.values.totalAmount * form.values.tax + shippingCost).toFixed(0));
  };

  const handleClickVariantResultItem = (variant: VariantResponse) => {
    setTimeout(() => {
      const orderVariantRequest: OrderVariantRequest = {
        variantId: variant.id,
        price: variant.price,
        quantity: 1,
        amount: variant.price,
      };
      const currentOrderVariantRequests = [...form.values.orderVariants, orderVariantRequest];
      form.setFieldValue('orderVariants', currentOrderVariantRequests);
      const totalAmount = calculateTotalAmount(currentOrderVariantRequests);
      form.setFieldValue('totalAmount', totalAmount);
      form.setFieldValue('totalPay', calculateTotalPayByTotalAmount(totalAmount));
      setVariants(variants => [...variants, variant]);
    }, 100);
  };

  const handleQuantityInput = (quantity: number, index: number) => {
    const currentOrderVariantRequests = produce(form.values.orderVariants, draft => {
      const variant = draft[index];
      variant.quantity = quantity;
      variant.amount = variant.price * quantity;
    });
    form.setFieldValue('orderVariants', currentOrderVariantRequests);
    const totalAmount = calculateTotalAmount(currentOrderVariantRequests);
    form.setFieldValue('totalAmount', totalAmount);
    form.setFieldValue('totalPay', calculateTotalPayByTotalAmount(totalAmount));
  };

  const handleDeleteVariantButton = (index: number) => {
    const currentOrderVariantRequests = form.values.orderVariants.filter((_, i) => i !== index);
    form.setFieldValue('orderVariants', currentOrderVariantRequests);
    const totalAmount = calculateTotalAmount(currentOrderVariantRequests);
    form.setFieldValue('totalAmount', totalAmount);
    form.setFieldValue('totalPay', calculateTotalPayByTotalAmount(totalAmount));
    setVariants(variants => variants.filter((_, i) => i !== index));
  };

  const handleShippingCostInput = (value: number) => {
    form.setFieldValue('shippingCost', value);
    form.setFieldValue('totalPay', calculateTotalPayByShippingCost(value));
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
      label: 'Đang xử lý',
    },
    {
      value: '3',
      label: 'Đang giao hàng',
    },
    {
      value: '4',
      label: 'Đã giao hàng',
    },
    {
      value: '5',
      label: 'Hủy bỏ',
    },
  ];

  return {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleShippingCostInput,
    resetForm,
    orderResourceSelectList,
    orderCancellationReasonSelectList,
    statusSelectList,
    variants,
  };
}

export default useOrderCreateViewModel;
