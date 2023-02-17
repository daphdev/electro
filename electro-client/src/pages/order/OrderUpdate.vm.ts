import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import OrderConfigs from 'pages/order/OrderConfigs';
import { OrderRequest, OrderResponse } from 'models/Order';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';
import { VariantResponse } from 'models/Variant';
import useGetAllApi from 'hooks/use-get-all-api';
import { OrderResourceResponse } from 'models/OrderResource';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import OrderCancellationReasonConfigs from 'pages/order-cancellation-reason/OrderCancellationReasonConfigs';
import { OrderVariantKeyRequest, OrderVariantRequest } from 'models/OrderVariant';
import produce from 'immer';
import useDeleteByIdsApi from 'hooks/use-delete-by-ids-api';
import ResourceURL from 'constants/ResourceURL';
import { PaymentMethodResponse } from 'models/PaymentMethod';
import PaymentMethodConfigs from 'pages/payment-method/PaymentMethodConfigs';

function useOrderUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: OrderConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(OrderConfigs.createUpdateFormSchema),
  });

  const [order, setOrder] = useState<OrderResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const [orderResourceSelectList, setOrderResourceSelectList] = useState<SelectOption[]>([]);
  const [orderCancellationReasonSelectList, setOrderCancellationReasonSelectList] = useState<SelectOption[]>([]);
  const [paymentMethodSelectList, setPaymentMethodSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const updateApi = useUpdateApi<OrderRequest, OrderResponse>(OrderConfigs.resourceUrl, OrderConfigs.resourceKey, id);
  useGetByIdApi<OrderResponse>(OrderConfigs.resourceUrl, OrderConfigs.resourceKey, id,
    (orderResponse) => {
      setOrder(orderResponse);
      const formValues: typeof form.values = {
        code: orderResponse.code,
        status: String(orderResponse.status),
        toName: orderResponse.toName,
        toPhone: orderResponse.toPhone,
        toAddress: orderResponse.toAddress,
        toWardName: orderResponse.toWardName,
        toDistrictName: orderResponse.toDistrictName,
        toProvinceName: orderResponse.toProvinceName,
        orderResourceId: String(orderResponse.orderResource.id),
        orderCancellationReasonId: orderResponse.orderCancellationReason
          ? String(orderResponse.orderCancellationReason.id) : null,
        note: orderResponse.note || '',
        userId: String(orderResponse.user.id),
        orderVariants: orderResponse.orderVariants
          .map(orderVariantResponse => ({
            variantId: orderVariantResponse.variant.id,
            price: orderVariantResponse.price,
            quantity: orderVariantResponse.quantity,
            amount: orderVariantResponse.amount,
          })),
        totalAmount: orderResponse.totalAmount,
        tax: orderResponse.tax,
        shippingCost: orderResponse.shippingCost,
        totalPay: orderResponse.totalPay,
        paymentMethodType: orderResponse.paymentMethodType,
        paymentStatus: String(orderResponse.paymentStatus),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
      setVariants(orderResponse.orderVariants.map(orderVariant => orderVariant.variant));
    }
  );
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
  useGetAllApi<PaymentMethodResponse>(PaymentMethodConfigs.resourceUrl, PaymentMethodConfigs.resourceKey,
    { sort: 'id,asc', all: 1 },
    (paymentMethodListResponse) => {
      const selectList: SelectOption[] = paymentMethodListResponse.content.map((item) => ({
        value: item.code,
        label: item.name,
      }));
      setPaymentMethodSelectList(selectList);
    }
  );

  const deleteByIdsApi = useDeleteByIdsApi<OrderVariantKeyRequest>(
    ResourceURL.ORDER_VARIANT,
    'order-variants'
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (prevFormValues && !MiscUtils.isEquals(formValues, prevFormValues)) {
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
        paymentMethodType: formValues.paymentMethodType,
        paymentStatus: Number(formValues.paymentStatus),
      };
      updateApi.mutate(requestBody);

      const deletedOrderVariantKeyRequests: OrderVariantKeyRequest[] = prevFormValues.orderVariants
        .map(orderVariantRequest => orderVariantRequest.variantId)
        .filter(variantId => !formValues.orderVariants.map(item => item.variantId).includes(variantId))
        .map(variantId => ({ orderId: id, variantId: variantId }));

      if (deletedOrderVariantKeyRequests.length > 0) {
        deleteByIdsApi.mutate(deletedOrderVariantKeyRequests);
      }
    }
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

  const paymentStatusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Chưa thanh toán',
    },
    {
      value: '2',
      label: 'Đã thanh toán',
    },
  ];

  return {
    order,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleShippingCostInput,
    resetForm,
    orderResourceSelectList,
    orderCancellationReasonSelectList,
    paymentMethodSelectList,
    statusSelectList,
    paymentStatusSelectList,
    variants,
  };
}

export default useOrderUpdateViewModel;
