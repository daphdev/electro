import React from 'react';
import { Avatar, Badge, Grid, Group, Highlight, Stack, useMantineTheme } from '@mantine/core';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  ManageTable,
  SearchPanel,
  VariantTablePopover
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
import { QuestionMark } from 'tabler-icons-react';

function ProductManage() {
  const theme = useMantineTheme();

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
        <Avatar
          src={(entity.images.find((image) => image.isThumbnail) || {}).path}
          alt={entity.name}
          radius="lg"
          size="lg"
          color="grape"
        >
          <QuestionMark size={30}/>
        </Avatar>
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
            .slice(0, 2)
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
          {entity.tags.length > 2 && (
            <Badge
              variant="dot"
              size="sm"
              sx={{ textTransform: 'none' }}
            >
              ... và {entity.tags.length - 2} tag nữa
            </Badge>
          )}
        </Stack>
      </td>
      <td>
        <VariantTablePopover variants={entity.variants} productProperties={entity.properties}/>
      </td>
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
          <Avatar
            src={(entity.images.find((image) => image.isThumbnail) || {}).path}
            alt={entity.name}
            radius="lg"
            size="lg"
            color="grape"
          >
            <QuestionMark size={30}/>
          </Avatar>
        </td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.images.label}</td>
        <td style={{ maxWidth: 300 }}>
          <Group spacing="xs">
            {entity.images.filter((image) => !image.isEliminated).map((image) => (
              <Avatar
                key={image.name}
                src={image.path}
                alt={image.name}
                radius="lg"
                size="lg"
                color="grape"
                sx={{ boxShadow: image.isThumbnail ? '0 0 0 2px ' + theme.colors.teal[theme.colorScheme === 'dark' ? 4 : 6] : 'none' }}
              >
                <QuestionMark size={30}/>
              </Avatar>
            ))}
          </Group>
        </td>
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
        <td style={{ maxWidth: 300 }}>
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
        <td style={{ maxWidth: 300 }}>
          {entity.specifications && (
            <Grid gutter="xs">
              <Grid.Col span={6}><strong>Thông số</strong></Grid.Col>
              <Grid.Col span={6}><strong>Giá trị</strong></Grid.Col>
              {entity.specifications.content.map((specification, index) => (
                <React.Fragment key={index}>
                  <Grid.Col span={6}>{specification.name}</Grid.Col>
                  <Grid.Col span={6}>{specification.value}</Grid.Col>
                </React.Fragment>
              ))}
            </Grid>
          )}
        </td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.properties.label}</td>
        <td style={{ maxWidth: 300 }}>
          {entity.properties && (
            <Grid gutter="xs">
              <Grid.Col span={6}><strong>Thuộc tính</strong></Grid.Col>
              <Grid.Col span={6}><strong>Giá trị</strong></Grid.Col>
              {entity.properties.content.map((property, index) => (
                <React.Fragment key={index}>
                  <Grid.Col span={6}>{property.name}</Grid.Col>
                  <Grid.Col span={6}>
                    <Group spacing="xs">
                      {property.value.map((value, index) => (
                        <Badge
                          key={index}
                          size="sm"
                          radius="sm"
                          variant="outline"
                          color="teal"
                          sx={{ textTransform: 'none' }}
                        >
                          {value}
                        </Badge>
                      ))}
                    </Group>
                  </Grid.Col>
                </React.Fragment>
              ))}
            </Grid>
          )}
        </td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.variants.label}</td>
        <td>{entity.variants.length === 0 ? <em>không có</em> : entity.variants.length + ' phiên bản'}</td>
      </tr>
      <tr>
        <td>{ProductConfigs.properties.weight.label}</td>
        <td>{entity.weight ? entity.weight + ' g' : ''}</td>
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
