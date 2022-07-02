import React from 'react';
import { Badge, Highlight, Stack } from '@mantine/core';
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
import { UnitResponse } from 'models/Unit';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import UnitConfigs from 'pages/unit/UnitConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function UnitManage() {
  useResetManagePageState();
  useInitFilterPanelState(UnitConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<UnitResponse>,
  } = useGetAllApi<UnitResponse>(UnitConfigs.resourceUrl, UnitConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const unitStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: UnitResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.name}
        </Highlight>
      </td>
      <td>{unitStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: UnitResponse) => (
    <>
      <tr>
        <td>{UnitConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{UnitConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{UnitConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{UnitConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{UnitConfigs.properties.status.label}</td>
        <td>{unitStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={UnitConfigs.manageTitleLinks}
          title={UnitConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={UnitConfigs.resourceUrl}
          resourceKey={UnitConfigs.resourceKey}
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
          properties={UnitConfigs.properties}
          resourceUrl={UnitConfigs.resourceUrl}
          resourceKey={UnitConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default UnitManage;
