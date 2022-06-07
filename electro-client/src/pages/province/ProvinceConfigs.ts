import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class ProvinceConfigs extends Configs {
  static managerPath = ManagerPath.PROVINCE;
  static resourceUrl = ResourceURL.PROVINCE;
  static createTitle = 'Thêm tỉnh thành';
  static updateTitle = 'Cập nhật tỉnh thành';
  static manageTitle = 'Quản lý tỉnh thành';

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
    name: {
      label: 'Tên tỉnh thành',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Mã tỉnh thành',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
  };

  static properties = ProvinceConfigs._rawProperties as
    EntityPropertySchema<typeof ProvinceConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(ProvinceConfigs.properties.name.label, 2)),
    code: z.string().max(35, MessageUtils.max(ProvinceConfigs.properties.code.label, 35)),
  });
}

export default ProvinceConfigs;
