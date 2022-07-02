import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import DepartmentConfigs from 'pages/department/DepartmentConfigs';
import { DepartmentRequest, DepartmentResponse } from 'models/Department';
import useUpdateApi from 'hooks/use-update-api';
import useGetByIdApi from 'hooks/use-get-by-id-api';
import MiscUtils from 'utils/MiscUtils';
import { SelectOption } from 'types';

function useDepartmentUpdateViewModel(id: number) {
  const form = useForm({
    initialValues: DepartmentConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(DepartmentConfigs.createUpdateFormSchema),
  });

  const [department, setDepartment] = useState<DepartmentResponse>();
  const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();

  const updateApi = useUpdateApi<DepartmentRequest, DepartmentResponse>(DepartmentConfigs.resourceUrl, DepartmentConfigs.resourceKey, id);
  useGetByIdApi<DepartmentResponse>(DepartmentConfigs.resourceUrl, DepartmentConfigs.resourceKey, id,
    (departmentResponse) => {
      setDepartment(departmentResponse);
      const formValues: typeof form.values = {
        name: departmentResponse.name,
        status: String(departmentResponse.status),
      };
      form.setValues(formValues);
      setPrevFormValues(formValues);
    }
  );

  const handleFormSubmit = form.onSubmit((formValues) => {
    setPrevFormValues(formValues);
    if (!MiscUtils.isEquals(formValues, prevFormValues)) {
      const requestBody: DepartmentRequest = {
        name: formValues.name,
        status: Number(formValues.status),
      };
      updateApi.mutate(requestBody);
    }
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'Đang hoạt động',
    },
    {
      value: '2',
      label: 'Ít hoạt động',
    },
    {
      value: '3',
      label: 'Không hoạt động',
    },
  ];

  return {
    department,
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useDepartmentUpdateViewModel;
