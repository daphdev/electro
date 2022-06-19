import React from 'react';
import { Highlight, Stack } from '@mantine/core';
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
import { ProvinceResponse } from 'models/Province';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function ProvinceManage() {
  useResetManagePageState();
  useInitFilterPanelState(ProvinceConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<ProvinceResponse>,
  } = useGetAllApi<ProvinceResponse>(ProvinceConfigs.resourceUrl, ProvinceConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const showedPropertiesFragment = (entity: ProvinceResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: ProvinceResponse) => (
    <>
      <tr>
        <td>{ProvinceConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{ProvinceConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{ProvinceConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{ProvinceConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{ProvinceConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ProvinceConfigs.manageTitleLinks}
          title={ProvinceConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={ProvinceConfigs.resourceUrl}
          resourceKey={ProvinceConfigs.resourceKey}
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
          properties={ProvinceConfigs.properties}
          resourceUrl={ProvinceConfigs.resourceUrl}
          resourceKey={ProvinceConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default ProvinceManage;
