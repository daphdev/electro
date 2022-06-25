import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import EmployeeConfigs from 'pages/employee/EmployeeConfigs';

class JobTypeConfigs extends Configs {
  static managerPath = ManagerPath.JOB_TYPE;
  static resourceUrl = ResourceURL.JOB_TYPE;
  static resourceKey = 'job-types';
  static createTitle = 'Thêm loại hình công việc';
  static updateTitle = 'Cập nhật loại hình công việc';
  static manageTitle = 'Quản lý loại hình công việc';

  static manageTitleLinks: TitleLink[] = EmployeeConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên loại hình công việc',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái loại hình công việc',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = JobTypeConfigs._rawProperties as
    EntityPropertySchema<typeof JobTypeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(JobTypeConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default JobTypeConfigs;
