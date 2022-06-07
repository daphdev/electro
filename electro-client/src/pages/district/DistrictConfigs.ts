import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';

class DistrictConfigs extends Configs {
  static managerPath = ManagerPath.DISTRICT;
  static resourceUrl = ResourceURL.DISTRICT;
  static createTitle = 'Thêm quận huyện';
  static updateTitle = 'Cập nhật quận huyện';
  static manageTitle = 'Quản lý quận huyện';

  static manageTitleLinks: TitleLink[] = ProvinceConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên quận huyện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Mã quận huyện',
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
      isShowInTable: true,
    },
  };

  static properties = DistrictConfigs._rawProperties as
    EntityPropertySchema<typeof DistrictConfigs._rawProperties & typeof PageConfigs.properties>;

  static additionalProperties = {
    provinceId: {
      label: 'Tỉnh thành',
      type: EntityPropertyType.NUMBER,
    },
  };

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    provinceId: '',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(DistrictConfigs.properties.name.label, 2)),
    code: z.string().max(35, MessageUtils.max(DistrictConfigs.properties.code.label, 35)),
    provinceId: z.string(),
  });
}

export default DistrictConfigs;
