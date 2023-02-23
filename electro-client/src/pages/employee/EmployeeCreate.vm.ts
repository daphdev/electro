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
  const form = useForm({
    initialValues: EmployeeConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(EmployeeConfigs.createUpdateFormSchema),
  });

  const [provinceSelectList, setProvinceSelectList] = useState<SelectOption[]>([]);
  const [districtSelectList, setDistrictSelectList] = useState<SelectOption[]>([]);
  const [officeSelectList, setOfficeSelectList] = useState<SelectOption[]>([]);
  const [departmentSelectList, setDepartmentSelectList] = useState<SelectOption[]>([]);
  const [jobTypeSelectList, setJobTypeSelectList] = useState<SelectOption[]>([]);
  const [jobLevelSelectList, setJobLevelSelectList] = useState<SelectOption[]>([]);
  const [jobTitleSelectList, setJobTitleSelectList] = useState<SelectOption[]>([]);

  const createApi = useCreateApi<EmployeeRequest, EmployeeResponse>(EmployeeConfigs.resourceUrl);
  useGetAllApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey,
    { all: 1 },
    (provinceListResponse) => {
      const selectList: SelectOption[] = provinceListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setProvinceSelectList(selectList);
    }
  );
  useGetAllApi<DistrictResponse>(DistrictConfigs.resourceUrl, DistrictConfigs.resourceKey,
    { all: 1 },
    (districtListResponse) => {
      const selectList: SelectOption[] = districtListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDistrictSelectList(selectList);
    }
  );
  useGetAllApi<OfficeResponse>(OfficeConfigs.resourceUrl, OfficeConfigs.resourceKey,
    { all: 1 },
    (officeListResponse) => {
      const selectList: SelectOption[] = officeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setOfficeSelectList(selectList);
    }
  );
  useGetAllApi<DepartmentResponse>(DepartmentConfigs.resourceUrl, DepartmentConfigs.resourceKey,
    { all: 1 },
    (departmentListResponse) => {
      const selectList: SelectOption[] = departmentListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDepartmentSelectList(selectList);
    }
  );
  useGetAllApi<JobTypeResponse>(JobTypeConfigs.resourceUrl, JobTypeConfigs.resourceKey,
    { all: 1 },
    (jobTypeListResponse) => {
      const selectList: SelectOption[] = jobTypeListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setJobTypeSelectList(selectList);
    }
  );
  useGetAllApi<JobLevelResponse>(JobLevelConfigs.resourceUrl, JobLevelConfigs.resourceKey,
    { all: 1 },
    (jobLevelListResponse) => {
      const selectList: SelectOption[] = jobLevelListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setJobLevelSelectList(selectList);
    }
  );
  useGetAllApi<JobTitleResponse>(JobTitleConfigs.resourceUrl, JobTitleConfigs.resourceKey,
    { all: 1 },
    (jobTitleListResponse) => {
      const selectList: SelectOption[] = jobTitleListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setJobTitleSelectList(selectList);
    }
  );

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
          wardId: null,
        },
        avatar: formValues['user.avatar'].trim() || null,
        status: Number(formValues['user.status']),
        roles: [{ id: EmployeeConfigs.EMPLOYEE_ROLE_ID }],
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
      label: 'Đã kích hoạt',
    },
    {
      value: '2',
      label: 'Chưa kích hoạt',
    },
  ];

  const userRoleSelectList: SelectOption[] = [
    {
      value: String(EmployeeConfigs.EMPLOYEE_ROLE_ID),
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
