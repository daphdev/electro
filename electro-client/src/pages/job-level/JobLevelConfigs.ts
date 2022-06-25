import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';

class JobLevelConfigs extends Configs {
  static managerPath = ManagerPath.JOB_LEVEL;
  static resourceUrl = ResourceURL.JOB_LEVEL;
  static resourceKey = 'job-levels';
  static createTitle = 'Thêm cấp bậc công việc';
  static updateTitle = 'Cập nhật cấp bậc công việc';
  static manageTitle = 'Quản lý cấp bậc công việc';

  static manageTitleLinks: TitleLink[] = EmployeeConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên cấp bậc công việc',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái cấp bậc công việc',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = JobLevelConfigs._rawProperties as
    EntityPropertySchema<typeof JobLevelConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(JobLevelConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default JobLevelConfigs;
