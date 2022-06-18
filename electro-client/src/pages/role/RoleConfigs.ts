import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import UserConfigs from 'pages/user/UserConfigs';

class RoleConfigs extends Configs {
  static managerPath = ManagerPath.ROLE;
  static resourceUrl = ResourceURL.ROLE;
  static resourceKey = 'roles';
  static createTitle = 'Thêm quyền';
  static updateTitle = 'Cập nhật quyền';
  static manageTitle = 'Quản lý quyền';

  static manageTitleLinks: TitleLink[] = UserConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    code: {
      label: 'Mã quyền',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Tên quyền',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái quyền',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = RoleConfigs._rawProperties as
    EntityPropertySchema<typeof RoleConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(RoleConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default RoleConfigs;
