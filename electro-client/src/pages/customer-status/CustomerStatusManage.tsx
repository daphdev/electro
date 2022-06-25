import React from 'react';
import { Badge, Code, ColorSwatch, Group, Highlight, Stack } from '@mantine/core';
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
import { CustomerStatusResponse } from 'models/CustomerStatus';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CustomerStatusConfigs from 'pages/customer-status/CustomerStatusConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function CustomerStatusManage() {
  useResetManagePageState();
  useInitFilterPanelState(CustomerStatusConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CustomerStatusResponse>,
  } = useGetAllApi<CustomerStatusResponse>(CustomerStatusConfigs.resourceUrl, CustomerStatusConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const customerStatusStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: CustomerStatusResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.name}
        </Highlight>
      </td>
      <td>
        <Group spacing="xs">
          <ColorSwatch color={entity.color}/>
          <Code>{entity.color.toLowerCase()}</Code>
        </Group>
      </td>
      <td>{customerStatusStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CustomerStatusResponse) => (
    <>
      <tr>
        <td>{CustomerStatusConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.description.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.description}</td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.color.label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.color}/>
            <Code>{entity.color.toLowerCase()}</Code>
          </Group>
        </td>
      </tr>
      <tr>
        <td>{CustomerStatusConfigs.properties.status.label}</td>
        <td>{customerStatusStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CustomerStatusConfigs.manageTitleLinks}
          title={CustomerStatusConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CustomerStatusConfigs.resourceUrl}
          resourceKey={CustomerStatusConfigs.resourceKey}
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
          properties={CustomerStatusConfigs.properties}
          resourceUrl={CustomerStatusConfigs.resourceUrl}
          resourceKey={CustomerStatusConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CustomerStatusManage;
