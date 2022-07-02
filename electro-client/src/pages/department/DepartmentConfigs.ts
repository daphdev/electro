import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';

class DepartmentConfigs extends Configs {
  static managerPath = ManagerPath.DEPARTMENT;
  static resourceUrl = ResourceURL.DEPARTMENT;
  static resourceKey = 'departments';
  static createTitle = 'Thêm phòng ban';
  static updateTitle = 'Cập nhật phòng ban';
  static manageTitle = 'Quản lý phòng ban';

  static manageTitleLinks: TitleLink[] = EmployeeConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên phòng ban',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái phòng ban',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = DepartmentConfigs._rawProperties as
    EntityPropertySchema<typeof DepartmentConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(DepartmentConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default DepartmentConfigs;
