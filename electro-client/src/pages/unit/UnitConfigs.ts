import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class UnitConfigs extends Configs {
  static managerPath = ManagerPath.UNIT;
  static resourceUrl = ResourceURL.UNIT;
  static resourceKey = 'units';
  static createTitle = 'Thêm đơn vị tính';
  static updateTitle = 'Cập nhật đơn vị tính';
  static manageTitle = 'Quản lý đơn vị tính';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên đơn vị tính',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái đơn vị tính',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = UnitConfigs._rawProperties as
    EntityPropertySchema<typeof UnitConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(UnitConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default UnitConfigs;
