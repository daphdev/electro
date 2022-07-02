import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class EmployeeConfigs extends Configs {
  static managerPath = ManagerPath.EMPLOYEE;
  static resourceUrl = ResourceURL.EMPLOYEE;
  static resourceKey = 'employees';
  static createTitle = 'Thêm nhân viên';
  static updateTitle = 'Cập nhật nhân viên';
  static manageTitle = 'Quản lý nhân viên';

  static EMPLOYEE_ROLE_ID = 2;

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.EMPLOYEE,
      label: 'Quản lý nhân viên',
    },
    {
      link: ManagerPath.OFFICE,
      label: 'Quản lý văn phòng',
    },
    {
      link: ManagerPath.DEPARTMENT,
      label: 'Quản lý phòng ban',
    },
    {
      link: ManagerPath.JOB_TYPE,
      label: 'Quản lý loại hình công việc',
    },
    {
      link: ManagerPath.JOB_LEVEL,
      label: 'Quản lý cấp bậc công việc',
    },
    {
      link: ManagerPath.JOB_TITLE,
      label: 'Quản lý chức danh công việc',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    'user.username': {
      label: 'Tên đăng nhập',
      type: EntityPropertyType.STRING,
    },
    'user.fullname': {
      label: 'Họ và tên',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'user.email': {
      label: 'Email',
      type: EntityPropertyType.STRING,
    },
    'user.phone': {
      label: 'Số điện thoại',
      type: EntityPropertyType.STRING,
    },
    'user.gender': {
      label: 'Giới tính',
      type: EntityPropertyType.OPTION,
    },
    'user.address.line': {
      label: 'Địa chỉ nhân viên',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.name': {
      label: 'Tên tỉnh thành nhân viên',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.code': {
      label: 'Mã tỉnh thành nhân viên',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.name': {
      label: 'Tên quận huyện nhân viên',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.code': {
      label: 'Mã quận huyện nhân viên',
      type: EntityPropertyType.STRING,
    },
    'user.avatar': {
      label: 'Ảnh đại diện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.status': {
      label: 'Trạng thái người dùng',
      type: EntityPropertyType.NUMBER,
    },
    'user.roles': {
      label: 'Quyền người dùng',
      type: EntityPropertyType.ARRAY,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.password': {
      label: 'Mật khẩu',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.provinceId': {
      label: 'Tỉnh thành',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'user.address.districtId': {
      label: 'Quận huyện',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'office.name': {
      label: 'Tên văn phòng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'office.address.line': {
      label: 'Địa chỉ văn phòng',
      type: EntityPropertyType.STRING,
    },
    'office.address.province.name': {
      label: 'Tên tỉnh thành văn phòng',
      type: EntityPropertyType.STRING,
    },
    'office.address.province.code': {
      label: 'Mã tỉnh thành văn phòng',
      type: EntityPropertyType.STRING,
    },
    'office.address.district.name': {
      label: 'Tên quận huyện văn phòng',
      type: EntityPropertyType.STRING,
    },
    'office.address.district.code': {
      label: 'Mã quận huyện văn phòng',
      type: EntityPropertyType.STRING,
    },
    'office.status': {
      label: 'Trạng thái văn phòng',
      type: EntityPropertyType.NUMBER,
    },
    officeId: {
      label: 'Văn phòng',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'department.name': {
      label: 'Tên phòng ban',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'department.status': {
      label: 'Trạng thái phòng ban',
      type: EntityPropertyType.NUMBER,
    },
    departmentId: {
      label: 'Phòng ban',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobType.name': {
      label: 'Tên loại hình công việc',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobType.status': {
      label: 'Trạng thái loại hình công việc',
      type: EntityPropertyType.NUMBER,
    },
    jobTypeId: {
      label: 'Loại hình công việc',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobLevel.name': {
      label: 'Tên cấp bậc công việc',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobLevel.status': {
      label: 'Trạng thái cấp bậc công việc',
      type: EntityPropertyType.NUMBER,
    },
    jobLevelId: {
      label: 'Cấp bậc công việc',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'jobTitle.name': {
      label: 'Tên chức danh công việc',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'jobTitle.status': {
      label: 'Trạng thái chức danh công việc',
      type: EntityPropertyType.NUMBER,
    },
    jobTitleId: {
      label: 'Chức danh công việc',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = EmployeeConfigs._rawProperties as
    EntityPropertySchema<typeof EmployeeConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    'user.username': '',
    'user.password': '',
    'user.fullname': '',
    'user.email': '',
    'user.phone': '',
    'user.gender': 'M' as 'M' | 'F',
    'user.address.line': '',
    'user.address.provinceId': null as string | null,
    'user.address.districtId': null as string | null,
    'user.avatar': '',
    'user.status': '1',
    'user.roles': [String(EmployeeConfigs.EMPLOYEE_ROLE_ID)],
    officeId: null as string | null,
    departmentId: null as string | null,
    jobTypeId: null as string | null,
    jobLevelId: null as string | null,
    jobTitleId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    'user.username': z.string().min(2, MessageUtils.min(EmployeeConfigs.properties['user.username'].label, 2)),
    'user.password': z.string(),
    'user.fullname': z.string(),
    'user.email': z.string(),
    'user.phone': z.string(),
    'user.gender': z.string(),
    'user.address.line': z.string(),
    'user.address.provinceId': z.string(),
    'user.address.districtId': z.string(),
    'user.avatar': z.string(),
    'user.status': z.string(),
    'user.roles': z.array(z.string()).nonempty(),
    officeId: z.string(),
    departmentId: z.string(),
    jobTypeId: z.string(),
    jobLevelId: z.string(),
    jobTitleId: z.string(),
  });
}

export default EmployeeConfigs;
