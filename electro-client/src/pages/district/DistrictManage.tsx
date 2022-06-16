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
import { DistrictResponse } from 'models/District';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import useGetAllApi from 'hooks/use-get-all-api';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useAppStore from 'stores/use-app-store';

function DistrictManage() {
  useGetAllApi<DistrictResponse>(DistrictConfigs.resourceUrl, DistrictConfigs.resourceKey);
  useInitFilterPanelState(DistrictConfigs.properties);

  const { searchToken } = useAppStore();

  const showedPropertiesFragment = (entity: DistrictResponse) => (
    <>
      <td>{entity.id}</td>
      <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue">
          {entity.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue">
          {entity.province.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue">
          {entity.province.code}
        </Highlight>
      </td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: DistrictResponse) => (
    <>
      <tr>
        <td>{DistrictConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties['province.name'].label}</td>
        <td>{entity.province.name}</td>
      </tr>
      <tr>
        <td>{DistrictConfigs.properties['province.code'].label}</td>
        <td>{entity.province.code}</td>
      </tr>
    </>
  );

  console.log('re-render DistrictManager ' + Math.random());

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={DistrictConfigs.manageTitleLinks}
          title={DistrictConfigs.manageTitle}
        />
        <ManageHeaderButtons
          resourceUrl={DistrictConfigs.resourceUrl}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain>
        <ManageTable
          properties={DistrictConfigs.properties}
          resourceUrl={DistrictConfigs.resourceUrl}
          resourceKey={DistrictConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination/>
    </Stack>
  );
}

export default DistrictManage;
