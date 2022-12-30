import { CategorySlugIconMap, EntityPropertySchema, EntityPropertyType, SelectOption } from 'types';
import { ListResponse } from 'utils/FetchUtils';
import {
  Cpu,
  DeviceGamepad2,
  DeviceLaptop,
  DeviceSpeaker,
  DeviceTablet,
  DeviceWatch,
  Keyboard,
  Mouse
} from 'tabler-icons-react';

class PageConfigs {
  static properties = {
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

  static getProperties = (...isShowInTable: boolean[]): EntityPropertySchema => {
    const properties = JSON.parse(JSON.stringify(PageConfigs.properties)) as EntityPropertySchema;
    Object.values(properties).forEach(
      (value, index) => isShowInTable[index] && (value.isShowInTable = isShowInTable[index])
    );
    return properties;
  };

  static initialListResponse: ListResponse = {
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

  static categorySlugIconMap: CategorySlugIconMap = {
    'laptop': DeviceLaptop,
    'tablet': DeviceTablet,
    'smartwatch': DeviceWatch,
    'am-thanh': DeviceSpeaker,
    'ban-phim': Keyboard,
    'chuot': Mouse,
    'may-choi-game': DeviceGamepad2,
    'cpu': Cpu,
  };
}

export default PageConfigs;
