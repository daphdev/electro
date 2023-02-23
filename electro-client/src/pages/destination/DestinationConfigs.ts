import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';

class DestinationConfigs extends Configs {
  static managerPath = ManagerPath.DESTINATION;
  static resourceUrl = ResourceURL.DESTINATION;
  static resourceKey = 'destinations';
  static createTitle = 'Thêm điểm nhập hàng';
  static updateTitle = 'Cập nhật điểm nhập hàng';
  static manageTitle = 'Quản lý điểm nhập hàng';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    contactFullname: {
      label: 'Họ và tên người liên hệ',
      type: EntityPropertyType.STRING,
    },
    contactEmail: {
      label: 'Email người liên hệ',
      type: EntityPropertyType.STRING,
    },
    contactPhone: {
      label: 'Số điện thoại người liên hệ',
      type: EntityPropertyType.STRING,
    },
    'address.line': {
      label: 'Địa chỉ',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.province.name': {
      label: 'Tên tỉnh thành',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'address.district.name': {
      label: 'Tên quận huyện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái điểm nhập hàng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'address.provinceId': {
      label: 'Tỉnh thành',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'Quận huyện',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = DestinationConfigs._rawProperties as
    EntityPropertySchema<typeof DestinationConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    contactFullname: '',
    contactEmail: '',
    contactPhone: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    contactFullname: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string(),
    'address.districtId': z.string(),
    status: z.string(),
  });
}

export default DestinationConfigs;
