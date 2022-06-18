import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class AddressConfigs extends Configs {
  static managerPath = ManagerPath.ADDRESS;
  static resourceUrl = ResourceURL.ADDRESS;
  static resourceKey = 'addresses';
  static createTitle = 'Thêm địa chỉ';
  static updateTitle = 'Cập nhật địa chỉ';
  static manageTitle = 'Quản lý địa chỉ';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.ADDRESS,
      label: 'Quản lý địa chỉ',
    },
    {
      link: ManagerPath.PROVINCE,
      label: 'Quản lý tỉnh thành',
    },
    {
      link: ManagerPath.DISTRICT,
      label: 'Quản lý quận huyện',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    line: {
      label: 'Địa chỉ',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'province.name': {
      label: 'Tên tỉnh thành',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'province.code': {
      label: 'Mã tỉnh thành',
      type: EntityPropertyType.STRING,
    },
    'district.name': {
      label: 'Tên quận huyện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'district.code': {
      label: 'Mã quận huyện',
      type: EntityPropertyType.STRING,
    },
    provinceId: {
      label: 'Tỉnh thành',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    districtId: {
      label: 'Quận huyện',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = AddressConfigs._rawProperties as
    EntityPropertySchema<typeof AddressConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    line: '',
    provinceId: '',
    districtId: '',
  };

  static createUpdateFormSchema = z.object({
    line: z.string().min(2, MessageUtils.min(AddressConfigs.properties.line.label, 2)),
    provinceId: z.string(),
    districtId: z.string(),
  });
}

export default AddressConfigs;
