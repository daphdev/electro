import { useForm, zodResolver } from '@mantine/form';
import DocketConfigs from 'pages/docket/DocketConfigs';
import { DocketRequest, DocketResponse } from 'models/Docket';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { DocketReasonResponse } from 'models/DocketReason';
import DocketReasonConfigs from 'pages/docket-reason/DocketReasonConfigs';
import { useState } from 'react';
import { WarehouseResponse } from 'models/Warehouse';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { VariantResponse } from 'models/Variant';
import { DocketVariantRequest } from 'models/DocketVariant';
import produce from 'immer';

function useDocketCreateViewModel() {
  const form = useForm({
    initialValues: DocketConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DocketConfigs.createUpdateFormSchema),
  });

  const [reasonSelectList, setReasonSelectList] = useState<SelectOption[]>([]);
  const [warehouseSelectList, setWarehouseSelectList] = useState<SelectOption[]>([]);

  const [variants, setVariants] = useState<VariantResponse[]>([]);

  const createApi = useCreateApi<DocketRequest, DocketResponse>(DocketConfigs.resourceUrl);
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

  const handleFormSubmit = form.onSubmit((formValues) => {
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
    createApi.mutate(requestBody);
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

export default useDocketCreateViewModel;
