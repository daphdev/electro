import { z } from 'zod';
import { EntityPropertyNames, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';

class ProvinceConfigs {
  static managerPath = 'address/province';
  static resourceUrl = ResourceURL.PROVINCE;
  static createTitle = 'Thêm tỉnh thành';
  static updateTitle = 'Cập nhật tỉnh thành';
  static manageTitle = 'Quản lý tỉnh thành';

  static manageTitleLinks: TitleLink[] = [
    {
      link: '/admin/address',
      label: 'Quản lý địa chỉ',
    },
    {
      link: '/admin/address/province',
      label: 'Quản lý tỉnh thành',
    },
    {
      link: '/admin/address/district',
      label: 'Quản lý quận huyện',
    },
  ];

  static properties: EntityPropertyNames = {
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
