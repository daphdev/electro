import React from 'react';
import { Avatar, Badge, ColorSwatch, Group, Highlight, Stack } from '@mantine/core';
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
import { CustomerResponse } from 'models/Customer';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CustomerConfigs from 'pages/customer/CustomerConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CustomerManage() {
  useResetManagePageState();
  useInitFilterPanelState(CustomerConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CustomerResponse>,
  } = useGetAllApi<CustomerResponse>(CustomerConfigs.resourceUrl, CustomerConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const userStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge color="blue" variant="outline" size="sm">Đã kích hoạt</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Chưa kích hoạt</Badge>;
  };

  const showedPropertiesFragment = (entity: CustomerResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.user.fullname}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.user.phone}
        </Highlight>
      </td>
      <td>
        <Avatar src={entity.user.avatar} alt={entity.user.fullname} radius="xl" size="sm"/>
      </td>
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.customerGroup.color}/>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.customerGroup.name}
          </Highlight>
        </Group>
      </td>
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.customerStatus.color}/>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.customerStatus.name}
          </Highlight>
        </Group>
      </td>
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.customerResource.color}/>
          <Highlight highlight={searchToken} highlightColor="blue" size="sm">
            {entity.customerResource.name}
          </Highlight>
        </Group>
      </td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CustomerResponse) => (
    <>
      <tr>
        <td>{CustomerConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.username'].label}</td>
        <td>{entity.user.username}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.fullname'].label}</td>
        <td>{entity.user.fullname}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.email'].label}</td>
        <td>{entity.user.email}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.phone'].label}</td>
        <td>{entity.user.phone}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.gender'].label}</td>
        <td>{entity.user.gender === 'M' ? 'Nam' : 'Nữ'}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.address.line'].label}</td>
        <td>{entity.user.address.line}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.address.province.name'].label}</td>
        <td>{entity.user.address.province?.name}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.address.province.code'].label}</td>
        <td>{entity.user.address.province?.code}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.address.district.name'].label}</td>
        <td>{entity.user.address.district?.name}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.address.district.code'].label}</td>
        <td>{entity.user.address.district?.code}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.avatar'].label}</td>
        <td>
          <Avatar src={entity.user.avatar} alt={entity.user.fullname} radius="xl" size="sm"/>
        </td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.status'].label}</td>
        <td>{userStatusBadgeFragment(entity.user.status)}</td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['user.roles'].label}</td>
        <td>
          <Stack spacing="xs" align="flex-start">
            {entity.user.roles.map((role, index) => <Badge key={index} variant="dot" size="sm">{role.name}</Badge>)}
          </Stack>
        </td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['customerGroup.name'].label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.customerGroup.color}/>
            {entity.customerGroup.name}
          </Group>
        </td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['customerStatus.name'].label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.customerStatus.color}/>
            {entity.customerStatus.name}
          </Group>
        </td>
      </tr>
      <tr>
        <td>{CustomerConfigs.properties['customerResource.name'].label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.customerResource.color}/>
            {entity.customerResource.name}
          </Group>
        </td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CustomerConfigs.manageTitleLinks}
          title={CustomerConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CustomerConfigs.resourceUrl}
          resourceKey={CustomerConfigs.resourceKey}
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
          properties={CustomerConfigs.properties}
          resourceUrl={CustomerConfigs.resourceUrl}
          resourceKey={CustomerConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CustomerManage;
