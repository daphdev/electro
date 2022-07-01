import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class GuaranteeConfigs extends Configs {
  static managerPath = ManagerPath.GUARANTEE;
  static resourceUrl = ResourceURL.GUARANTEE;
  static resourceKey = 'guarantees';
  static createTitle = 'Thêm bảo hành';
  static updateTitle = 'Cập nhật bảo hành';
  static manageTitle = 'Quản lý bảo hành';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên bảo hành',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Mô tả bảo hành',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Trạng thái bảo hành',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = GuaranteeConfigs._rawProperties as
    EntityPropertySchema<typeof GuaranteeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    description: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(GuaranteeConfigs.properties.name.label, 2)),
    description: z.string(),
    status: z.string(),
  });
}

export default GuaranteeConfigs;
