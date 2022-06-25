import { useForm, zodResolver } from '@mantine/form';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';
import { EmployeeRequest, EmployeeResponse } from 'models/Employee';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import { useState } from 'react';
import { OfficeResponse } from 'models/Office';
import OfficeConfigs from 'pages/office/OfficeConfigs';
import { DepartmentResponse } from 'models/Department';
import DepartmentConfigs from 'pages/department/DepartmentConfigs';
import { JobTypeResponse } from 'models/JobType';
import JobTypeConfigs from 'pages/job-type/JobTypeConfigs';
import { JobLevelResponse } from 'models/JobLevel';
import JobLevelConfigs from 'pages/job-level/JobLevelConfigs';
import { JobTitleResponse } from 'models/JobTitle';
import JobTitleConfigs from 'pages/job-title/JobTitleConfigs';

function useEmployeeCreateViewModel() {
  const createApi = useCreateApi<EmployeeRequest, EmployeeResponse>(EmployeeConfigs.resourceUrl);
  const { data: provinceListResponse } = useGetAllApi<ProvinceResponse>(
    ProvinceConfigs.resourceUrl,
    ProvinceConfigs.resourceKey,
    { all: 1 }
  );
  const { data: districtListResponse } = useGetAllApi<DistrictResponse>(
    DistrictConfigs.resourceUrl,
    DistrictConfigs.resourceKey,
    { all: 1 }
  );
  const { data: officeListResponse } = useGetAllApi<OfficeResponse>(
    OfficeConfigs.resourceUrl,
    OfficeConfigs.resourceKey,
    { all: 1 }
  );
  const { data: departmentListResponse } = useGetAllApi<DepartmentResponse>(
    DepartmentConfigs.resourceUrl,
    DepartmentConfigs.resourceKey,
    { all: 1 }
  );
  const { data: jobTypeListResponse } = useGetAllApi<JobTypeResponse>(
    JobTypeConfigs.resourceUrl,
    JobTypeConfigs.resourceKey,
    { all: 1 }
  );
  const { data: jobLevelListResponse } = useGetAllApi<JobLevelResponse>(
    JobLevelConfigs.resourceUrl,
    JobLevelConfigs.resourceKey,
    { all: 1 }
  );
  const { data: jobTitleListResponse } = useGetAllApi<JobTitleResponse>(
    JobTitleConfigs.resourceUrl,
    JobTitleConfigs.resourceKey,
    { all: 1 }
  );

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>();
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>();
  const [officeSelectList, setOfficeSelectList] = useState<SelectOption[]>();
  const [departmentSelectList, setDepartmentSelectList] = useState<SelectOption[]>();
  const [jobTypeSelectList, setJobTypeSelectList] = useState<SelectOption[]>();
  const [jobLevelSelectList, setJobLevelSelectList] = useState<SelectOption[]>();
  const [jobTitleSelectList, setJobTitleSelectList] = useState<SelectOption[]>();

  const form = useForm({
    initialValues: EmployeeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(EmployeeConfigs.createUpdateFormSchema),
  });

  if (!provinceSelectList && provinceListResponse) {
    const selectList: SelectOption[] = provinceListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setProvinceSelectList(selectList);
  }

  if (!districtSelectList && districtListResponse) {
    const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setDistrictSelectList(selectList);
  }

  if (!officeSelectList && officeListResponse) {
    const selectList: SelectOption[] = officeListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setOfficeSelectList(selectList);
  }

  if (!departmentSelectList && departmentListResponse) {
    const selectList: SelectOption[] = departmentListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setDepartmentSelectList(selectList);
  }

  if (!jobTypeSelectList && jobTypeListResponse) {
    const selectList: SelectOption[] = jobTypeListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setJobTypeSelectList(selectList);
  }

  if (!jobLevelSelectList && jobLevelListResponse) {
    const selectList: SelectOption[] = jobLevelListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setJobLevelSelectList(selectList);
  }

  if (!jobTitleSelectList && jobTitleListResponse) {
    const selectList: SelectOption[] = jobTitleListResponse.content.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setJobTitleSelectList(selectList);
  }

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: EmployeeRequest = {
      user: {
        username: formValues['user.username'],
        password: formValues['user.password'],
        fullname: formValues['user.fullname'],
        email: formValues['user.email'],
        phone: formValues['user.phone'],
        gender: formValues['user.gender'],
        address: {
          line: formValues['user.address.line'],
          provinceId: Number(formValues['user.address.provinceId']),
          districtId: Number(formValues['user.address.districtId']),
        },
        avatar: formValues['user.avatar'].trim() || null,
        status: Number(formValues['user.status']),
        roles: [{ id: 2 }],
      },
      officeId: Number(formValues.officeId),
      departmentId: Number(formValues.departmentId),
      jobTypeId: Number(formValues.jobTypeId),
      jobLevelId: Number(formValues.jobLevelId),
      jobTitleId: Number(formValues.jobTitleId),
    };
    createApi.mutate(requestBody);
  });

  const userGenderSelectList: SelectOption[] = [
    {
      value: 'M',
      label: 'Nam',
    },
    {
      value: 'F',
      label: 'Nữ',
    },
  ];

  const userStatusSelectList: SelectOption[] = [
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

  const userRoleSelectList: SelectOption[] = [
    {
      value: 'EMPLOYEE',
      label: 'Nhân viên',
    },
  ];

  return {
    form,
    handleFormSubmit,
    userGenderSelectList,
    provinceSelectList,
    districtSelectList,
    userStatusSelectList,
    userRoleSelectList,
    officeSelectList,
    departmentSelectList,
    jobTypeSelectList,
    jobLevelSelectList,
    jobTitleSelectList,
  };
}

export default useEmployeeCreateViewModel;
