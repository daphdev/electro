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
import { OrderResourceResponse } from 'models/OrderResource';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function OrderResourceManage() {
  useResetManagePageState();
  useInitFilterPanelState(OrderResourceConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<OrderResourceResponse>,
  } = useGetAllApi<OrderResourceResponse>(OrderResourceConfigs.resourceUrl, OrderResourceConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const orderResourceStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: OrderResourceResponse) => (
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
      <td>
        {entity.customerResource && (
          <Group spacing="xs">
            <ColorSwatch color={entity.customerResource.color}/>
            <Highlight highlight={searchToken} highlightColor="blue" size="sm">
              {entity.customerResource.name}
            </Highlight>
          </Group>
        )}
      </td>
      <td>{orderResourceStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: OrderResourceResponse) => (
    <>
      <tr>
        <td>{OrderResourceConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.color.label}</td>
        <td>
          <Group spacing="xs">
            <ColorSwatch color={entity.color}/>
            <Code>{entity.color.toLowerCase()}</Code>
          </Group>
        </td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties['customerResource.name'].label}</td>
        <td>
          {entity.customerResource && (
            <Group spacing="xs">
              <ColorSwatch color={entity.customerResource.color}/>
              {entity.customerResource.name}
            </Group>
          )}
        </td>
      </tr>
      <tr>
        <td>{OrderResourceConfigs.properties.status.label}</td>
        <td>{orderResourceStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={OrderResourceConfigs.manageTitleLinks}
          title={OrderResourceConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={OrderResourceConfigs.resourceUrl}
          resourceKey={OrderResourceConfigs.resourceKey}
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
          properties={OrderResourceConfigs.properties}
          resourceUrl={OrderResourceConfigs.resourceUrl}
          resourceKey={OrderResourceConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default OrderResourceManage;
