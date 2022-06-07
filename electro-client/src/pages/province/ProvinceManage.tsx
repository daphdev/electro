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
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceManageViewModel from 'pages/province/ProvinceManage.vm';
import useAppStore from 'stores/use-app-store';

function ProvinceManage() {
  useProvinceManageViewModel();

  const { searchToken } = useAppStore();

  const showedPropertiesFragment = (entity: ProvinceResponse) => (
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
    </>
  );

  const entityDetailsTableRowsFragment = (entity: ProvinceResponse) => (
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

  console.log('re-render ProvinceManager ' + Math.random());

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ProvinceConfigs.manageTitleLinks}
          title={ProvinceConfigs.manageTitle}
        />
        <ManageHeaderButtons
          resourceUrl={ProvinceConfigs.resourceUrl}
        />
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain>
        <ManageTable
          properties={ProvinceConfigs.properties}
          resourceUrl={ProvinceConfigs.resourceUrl}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailsTableRowsFragment={entityDetailsTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination/>
    </Stack>
  );
}

export default ProvinceManage;
