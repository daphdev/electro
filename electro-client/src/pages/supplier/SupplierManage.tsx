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
import { SupplierResponse } from 'models/Supplier';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function SupplierManage() {
  useResetManagePageState();
  useInitFilterPanelState(SupplierConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<SupplierResponse>,
  } = useGetAllApi<SupplierResponse>(SupplierConfigs.resourceUrl, SupplierConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const supplierStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: SupplierResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.displayName}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.code}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.contactFullname || ''}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.contactPhone || ''}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.companyName || ''}
        </Highlight>
      </td>
      <td>{supplierStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: SupplierResponse) => (
    <>
      <tr>
        <td>{SupplierConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.displayName.label}</td>
        <td>{entity.displayName}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.contactFullname.label}</td>
        <td>{entity.contactFullname}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.contactEmail.label}</td>
        <td>{entity.contactEmail}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.contactPhone.label}</td>
        <td>{entity.contactPhone}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.companyName.label}</td>
        <td>{entity.companyName}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.taxCode.label}</td>
        <td>{entity.taxCode}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.email.label}</td>
        <td>{entity.email}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.phone.label}</td>
        <td>{entity.phone}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.fax.label}</td>
        <td>{entity.fax}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.website.label}</td>
        <td>{entity.website}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties['address.line'].label}</td>
        <td>{entity.address?.line}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties['address.province.name'].label}</td>
        <td>{entity.address?.province?.name}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties['address.district.name'].label}</td>
        <td>{entity.address?.district?.name}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.description.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.description}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.note.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.note}</td>
      </tr>
      <tr>
        <td>{SupplierConfigs.properties.status.label}</td>
        <td>{supplierStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={SupplierConfigs.manageTitleLinks}
          title={SupplierConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={SupplierConfigs.resourceUrl}
          resourceKey={SupplierConfigs.resourceKey}
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
          properties={SupplierConfigs.properties}
          resourceUrl={SupplierConfigs.resourceUrl}
          resourceKey={SupplierConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default SupplierManage;
