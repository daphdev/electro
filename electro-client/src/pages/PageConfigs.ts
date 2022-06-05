import { EntityPropertyNames, EntityPropertyType, SelectOption, TitleLink } from 'types';
import { ListResponse } from 'utils/FetchUtils';
import { FilterPropertyTypes } from 'utils/FilterUtils';

export interface Configs {
  managerPath: string;
  resourceUrl: string;
  createTitle: string;
  updateTitle: string;
  manageTitle: string;
  manageTitleLinks: TitleLink[];
  properties: EntityPropertyNames;
  initialCreateUpdateFormValues: object;
  createUpdateFormSchema: object;
  initialPropertySelectList: SelectOption[];
  initialFilterPropertyTypes: FilterPropertyTypes;
}

class PageConfigs {
  static properties: EntityPropertyNames = {
    id: {
      label: 'ID',
      type: EntityPropertyType.NUMBER,
    },
    createdAt: {
      label: 'Ngày tạo',
      type: EntityPropertyType.DATE,
    },
    updatedAt: {
      label: 'Ngày cập nhật',
      type: EntityPropertyType.DATE,
    },
    createdBy: {
      label: 'Người tạo',
      type: EntityPropertyType.STRING,
    },
    updatedBy: {
      label: 'Người cập nhật',
      type: EntityPropertyType.STRING,
    },
  };

  static getProperties = (...isShowInTable: boolean[]): EntityPropertyNames => {
    const properties = JSON.parse(JSON.stringify(PageConfigs.properties)) as EntityPropertyNames;
    Object.values(properties).forEach(
      (value, index) => isShowInTable[index] && (value.isShowInTable = isShowInTable[index])
    );
    return properties;
  };

  static initialListResponse: ListResponse<unknown> = {
    content: [],
    page: 1,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    last: false,
  };

  static initialPageSizeSelectList: SelectOption[] = [
    {
      value: '5',
      label: '5',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '25',
      label: '25',
    },
    {
      value: '50',
      label: '50',
    },
  ];
}

export default PageConfigs;
