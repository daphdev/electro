import React, { useEffect } from 'react';
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
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse, RequestParams } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import useAppStore from 'stores/use-app-store';
import FilterUtils from 'utils/FilterUtils';


function ProvinceManage() {
  const {
    // searchToken,
    getProvinces,
  } = useProvinceManageViewModel();
  console.log('re-render ProvinceManager' + Math.random());
  // useEffect(() => {
  //   void getProvinces();
  // }, [getProvinces]);

  const {
    triggerRefetchList,
    setTriggerRefetchList,
    getRequestParams,
    activePage,
    activePageSize,
    searchToken,
    activeFilter,
    loading,
    setLoading,
  } = useAppStore();

  async function getAll<O>(url: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
    const response = await fetch(url);
    // setTriggerRefetchList(false);
    return await response.json();
  }

  const requestParams = {
    page: activePage,
    size: activePageSize,
    sort: FilterUtils.convertToSortRSQL(activeFilter),
    filter: FilterUtils.convertToFilterRSQL(activeFilter),
    search: searchToken,
  };
  // let loading = true;
  const queryResult = useQuery<ListResponse<ProvinceResponse>, ErrorMessage>(
    ['provinces', 'getAll', requestParams],
    () => getAll<ProvinceResponse>(FetchUtils.concatParams(ProvinceConfigs.resourceUrl, requestParams)),
    {
      // onSettled: () => setTimeout(() => {
      //   setLoading(false);
      // }, 100),
      keepPreviousData: true,
    }
  );


  // setTimeout(() => (loading = queryResult.isLoading), 1200);

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

      <ManageMain
        isLoading={queryResult.isLoading}
        listResponse={queryResult.data || PageConfigs.initialListResponse}
      >
        <ManageTable
          properties={ProvinceConfigs.properties}
          resourceUrl={ProvinceConfigs.resourceUrl}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailsTableRowsFragment={entityDetailsTableRowsFragment}
          listResponse={queryResult.data || PageConfigs.initialListResponse as ListResponse<ProvinceResponse>}
        />
      </ManageMain>

      <ManagePagination
        listResponse={queryResult.data || PageConfigs.initialListResponse}
      />
    </Stack>
  );
}

export default ProvinceManage;
