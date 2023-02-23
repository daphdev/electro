import React from 'react';
import { Avatar, Badge, Highlight, Stack } from '@mantine/core';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  ManageTable,
  SearchPanel
} from 'components';
import DateUtils from 'utils/DateUtils';
import { EmployeeResponse } from 'models/Employee';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function EmployeeManage() {
  useResetManagePageState();
  useInitFilterPanelState(EmployeeConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<EmployeeResponse>,
  } = useGetAllApi<EmployeeResponse>(EmployeeConfigs.resourceUrl, EmployeeConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const userStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Đã kích hoạt</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Chưa kích hoạt</Badge>;
  };

  const officeStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Đang hoạt động</Badge>;
    }

    if (status === 2) {
      return <Badge color="teal" variant="outline" size="sm">Ít hoạt động</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Không hoạt động</Badge>;
  };

  const departmentStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Đang hoạt động</Badge>;
    }

    if (status === 2) {
      return <Badge color="teal" variant="outline" size="sm">Ít hoạt động</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Không hoạt động</Badge>;
  };

  const jobTypeStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const jobLevelStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const jobTitleStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: EmployeeResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.user.fullname}
        </Highlight>
      </td>
      <td>
        <Avatar src={entity.user.avatar} alt={entity.user.fullname} radius="xl" size="sm"/>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.office.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.department.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.jobType.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.jobLevel.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.jobTitle.name}
        </Highlight>
      </td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: EmployeeResponse) => (
    <>
      <tr>
        <td>{EmployeeConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.username'].label}</td>
        <td>{entity.user.username}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.fullname'].label}</td>
        <td>{entity.user.fullname}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.email'].label}</td>
        <td>{entity.user.email}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.phone'].label}</td>
        <td>{entity.user.phone}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.gender'].label}</td>
        <td>{entity.user.gender === 'M' ? 'Nam' : 'Nữ'}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.address.line'].label}</td>
        <td>{entity.user.address.line}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.address.province.name'].label}</td>
        <td>{entity.user.address.province?.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.address.province.code'].label}</td>
        <td>{entity.user.address.province?.code}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.address.district.name'].label}</td>
        <td>{entity.user.address.district?.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.address.district.code'].label}</td>
        <td>{entity.user.address.district?.code}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.avatar'].label}</td>
        <td>
          <Avatar src={entity.user.avatar} alt={entity.user.fullname} radius="xl" size="sm"/>
        </td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.status'].label}</td>
        <td>{userStatusBadgeFragment(entity.user.status)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['user.roles'].label}</td>
        <td>
          <Stack spacing="xs" align="flex-start">
            {entity.user.roles.map((role, index) => <Badge key={index} variant="dot" size="sm">{role.name}</Badge>)}
          </Stack>
        </td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.name'].label}</td>
        <td>{entity.office.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.address.line'].label}</td>
        <td>{entity.office.address.line}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.address.province.name'].label}</td>
        <td>{entity.office.address.province?.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.address.province.code'].label}</td>
        <td>{entity.office.address.province?.code}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.address.district.name'].label}</td>
        <td>{entity.office.address.district?.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.address.district.code'].label}</td>
        <td>{entity.office.address.district?.code}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['office.status'].label}</td>
        <td>{officeStatusBadgeFragment(entity.office.status)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['department.name'].label}</td>
        <td>{entity.department.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['department.status'].label}</td>
        <td>{departmentStatusBadgeFragment(entity.department.status)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobType.name'].label}</td>
        <td>{entity.jobType.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobType.status'].label}</td>
        <td>{jobTypeStatusBadgeFragment(entity.jobType.status)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobLevel.name'].label}</td>
        <td>{entity.jobLevel.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobLevel.status'].label}</td>
        <td>{jobLevelStatusBadgeFragment(entity.jobLevel.status)}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobTitle.name'].label}</td>
        <td>{entity.jobTitle.name}</td>
      </tr>
      <tr>
        <td>{EmployeeConfigs.properties['jobTitle.status'].label}</td>
        <td>{jobTitleStatusBadgeFragment(entity.jobTitle.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={EmployeeConfigs.manageTitleLinks}
          title={EmployeeConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={EmployeeConfigs.resourceUrl}
          resourceKey={EmployeeConfigs.resourceKey}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <ManageTable
          listResponse={listResponse}
          properties={EmployeeConfigs.properties}
          resourceUrl={EmployeeConfigs.resourceUrl}
          resourceKey={EmployeeConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default EmployeeManage;
