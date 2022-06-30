import React from 'react';
import { Avatar, Badge, Group, Highlight, Stack } from '@mantine/core';
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
import { ProductResponse } from 'models/Product';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import ProductConfigs from 'pages/product/ProductConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';

function ProductManage() {
  useResetManagePageState();
  useInitFilterPanelState(ProductConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<ProductResponse>,
  } = useGetAllApi<ProductResponse>(ProductConfigs.resourceUrl, ProductConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const productStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: ProductResponse) => (
    <>
      <td>{entity.id}</td>
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
      <td>
        <Avatar src={entity.thumbnail} alt={entity.name} radius="lg" size="lg"/>
      </td>
      <td>{productStatusBadgeFragment(entity.status)}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.category?.name || ''}
        </Highlight>
      </td>
      <td>
        <Stack spacing="xs" align="flex-start">
          {entity.tags
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tag, index) => (
              <Badge
                key={index}
                variant="dot"
                size="sm"
                sx={{ textTransform: 'none' }}
              >
                {tag.name}
              </Badge>
            ))}
        </Stack>
      </td>
      <td>{entity.variants.length + ' phiên bản'}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: ProductResponse) => (
    <>
      <tr>
        <td>{ProductConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.code.label}</td>
        <td>{entity.code}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.slug.label}</td>
        <td>{entity.slug}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.shortDescription.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.shortDescription}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.description.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.description}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.thumbnail.label}</td>
        <td>
          <Avatar src={entity.thumbnail} alt={entity.name} radius="lg" size="lg"/>
        </td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.images.label}</td>
        <td>{entity.images?.totalElements + ' hình ảnh'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.status.label}</td>
        <td>{productStatusBadgeFragment(entity.status)}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties['category.name'].label}</td>
        <td>{entity.category?.name}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties['brand.name'].label}</td>
        <td>{entity.brand?.name}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties['supplier.displayName'].label}</td>
        <td>{entity.supplier?.displayName}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties['unit.name'].label}</td>
        <td>{entity.unit?.name}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.tags.label}</td>
        <td>
          <Group spacing="xs">
            {entity.tags
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tag, index) => (
                <Badge
                  key={index}
                  variant="dot"
                  size="sm"
                  sx={{ textTransform: 'none' }}
                >
                  {tag.name}
                </Badge>
              ))}
          </Group>
        </td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.specifications.label}</td>
        <td>{entity.specifications?.totalElements + ' thông số'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.properties.label}</td>
        <td>{entity.properties?.totalElements + ' thuộc tính'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.variants.label}</td>
        <td>{entity.variants.length + ' phiên bản'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.weight.label}</td>
        <td>{entity.weight + ' g'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties['guarantee.name'].label}</td>
        <td>{entity.guarantee?.name}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ProductConfigs.manageTitleLinks}
          title={ProductConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={ProductConfigs.resourceUrl}
          resourceKey={ProductConfigs.resourceKey}
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
          properties={ProductConfigs.properties}
          resourceUrl={ProductConfigs.resourceUrl}
          resourceKey={ProductConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default ProductManage;
