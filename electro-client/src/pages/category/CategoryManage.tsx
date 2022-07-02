import React from 'react';
import { Avatar, Badge, Highlight, Stack } from '@mantine/core';
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
import { CategoryResponse } from 'models/Category';
import { ListResponse } from 'utils/FetchUtils';
import PageConfigs from 'pages/PageConfigs';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import useInitFilterPanelState from 'hooks/use-init-filter-panel-state';
import useGetAllApi from 'hooks/use-get-all-api';
import useAppStore from 'stores/use-app-store';
import { QuestionMark } from 'tabler-icons-react';

function CategoryManage() {
  useResetManagePageState();
  useInitFilterPanelState(CategoryConfigs.properties);

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<CategoryResponse>,
  } = useGetAllApi<CategoryResponse>(CategoryConfigs.resourceUrl, CategoryConfigs.resourceKey);

  const { searchToken } = useAppStore();

  const categoryStatusBadgeFragment = (status: number) => {
    if (status === 1) {
      return <Badge variant="outline" size="sm">Có hiệu lực</Badge>;
    }

    return <Badge color="red" variant="outline" size="sm">Vô hiệu lực</Badge>;
  };

  const showedPropertiesFragment = (entity: CategoryResponse) => (
    <>
      <td>{entity.id}</td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.name}
        </Highlight>
      </td>
      <td>
        <Highlight highlight={searchToken} highlightColor="blue" size="sm">
          {entity.slug}
        </Highlight>
      </td>
      <td>
        <Avatar src={entity.thumbnail} alt={entity.name} radius="lg" size="lg" color="grape">
          <QuestionMark size={30}/>
        </Avatar>
      </td>
      <td>{entity.parentCategory ? entity.parentCategory.name : <em>không có</em>}</td>
      <td>{categoryStatusBadgeFragment(entity.status)}</td>
    </>
  );

  const entityDetailTableRowsFragment = (entity: CategoryResponse) => (
    <>
      <tr>
        <td>{CategoryConfigs.properties.id.label}</td>
        <td>{entity.id}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.createdAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.updatedAt.label}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.name.label}</td>
        <td>{entity.name}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.slug.label}</td>
        <td>{entity.slug}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.description.label}</td>
        <td style={{ maxWidth: 300 }}>{entity.description}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.thumbnail.label}</td>
        <td>
          <Avatar src={entity.thumbnail} alt={entity.name} radius="lg" size="lg" color="grape">
            <QuestionMark size={30}/>
          </Avatar>
        </td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties['parentCategory.name'].label}</td>
        <td>{entity.parentCategory ? entity.parentCategory.name : <em>không có</em>}</td>
      </tr>
      <tr>
        <td>{CategoryConfigs.properties.status.label}</td>
        <td>{categoryStatusBadgeFragment(entity.status)}</td>
      </tr>
    </>
  );

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={CategoryConfigs.manageTitleLinks}
          title={CategoryConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={CategoryConfigs.resourceUrl}
          resourceKey={CategoryConfigs.resourceKey}
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
          properties={CategoryConfigs.properties}
          resourceUrl={CategoryConfigs.resourceUrl}
          resourceKey={CategoryConfigs.resourceKey}
          showedPropertiesFragment={showedPropertiesFragment}
          entityDetailTableRowsFragment={entityDetailTableRowsFragment}
        />
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </Stack>
  );
}

export default CategoryManage;
