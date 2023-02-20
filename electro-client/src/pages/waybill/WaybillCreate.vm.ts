import { useForm, zodResolver } from '@mantine/form';
import WaybillConfigs from 'pages/waybill/WaybillConfigs';
import { RequiredNote, WaybillRequest, WaybillResponse } from 'models/Waybill';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useWaybillCreateViewModel() {
  const form = useForm({
    initialValues: WaybillConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(WaybillConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<WaybillRequest, WaybillResponse>(WaybillConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: WaybillRequest = {
      orderId: Number(formValues.orderId),
      shippingDate: formValues.shippingDate.toISOString(),
      weight: formValues.weight,
      length: formValues.length,
      width: formValues.width,
      height: formValues.height,
      note: formValues.note.trim() || null,
      ghnRequiredNote: formValues.ghnRequiredNote,
    };
    createApi.mutate(requestBody);
  });

  const ghnRequiredNoteSelectList: SelectOption[] = [
    {
      value: RequiredNote.CHOTHUHANG,
      label: WaybillConfigs.ghnRequiredNoteMap[RequiredNote.CHOTHUHANG],
    },
    {
      value: RequiredNote.CHOXEMHANGKHONGTHU,
      label: WaybillConfigs.ghnRequiredNoteMap[RequiredNote.CHOXEMHANGKHONGTHU],
    },
    {
      value: RequiredNote.KHONGCHOXEMHANG,
      label: WaybillConfigs.ghnRequiredNoteMap[RequiredNote.KHONGCHOXEMHANG],
    },
  ];

  return {
    form,
    handleFormSubmit,
    ghnRequiredNoteSelectList,
  };
}

export default useWaybillCreateViewModel;
