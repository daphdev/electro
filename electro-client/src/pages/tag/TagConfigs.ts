import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class TagConfigs extends Configs {
  static managerPath = ManagerPath.TAG;
  static resourceUrl = ResourceURL.TAG;
  static resourceKey = 'tags';
  static createTitle = 'Thêm tag';
  static updateTitle = 'Cập nhật tag';
  static manageTitle = 'Quản lý tag';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên tag',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    slug: {
      label: 'Slug tag',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái tag',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = TagConfigs._rawProperties as
    EntityPropertySchema<typeof TagConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    slug: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(TagConfigs.properties.name.label, 2)),
    slug: z.string(),
    status: z.string(),
  });
}

export default TagConfigs;
