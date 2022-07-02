import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class UserConfigs extends Configs {
  static managerPath = ManagerPath.USER;
  static resourceUrl = ResourceURL.USER;
  static resourceKey = 'users';
  static createTitle = 'Thêm người dùng';
  static updateTitle = 'Cập nhật người dùng';
  static manageTitle = 'Quản lý người dùng';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.USER,
      label: 'Quản lý người dùng',
    },
    {
      link: ManagerPath.ROLE,
      label: 'Quản lý quyền',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    username: {
      label: 'Tên đăng nhập',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    fullname: {
      label: 'Họ và tên',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    email: {
      label: 'Email',
      type: EntityPropertyType.STRING,
    },
    phone: {
      label: 'Số điện thoại',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    gender: {
      label: 'Giới tính',
      type: EntityPropertyType.OPTION,
      isShowInTable: true,
    },
    'address.line': {
      label: 'Địa chỉ',
      type: EntityPropertyType.STRING,
    },
    'address.province.name': {
      label: 'Tên tỉnh thành',
      type: EntityPropertyType.STRING,
    },
    'address.province.code': {
      label: 'Mã tỉnh thành',
      type: EntityPropertyType.STRING,
    },
    'address.district.name': {
      label: 'Tên quận huyện',
      type: EntityPropertyType.STRING,
    },
    'address.district.code': {
      label: 'Mã quận huyện',
      type: EntityPropertyType.STRING,
    },
    avatar: {
      label: 'Ảnh đại diện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Trạng thái người dùng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    roles: {
      label: 'Quyền người dùng',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    password: {
      label: 'Mật khẩu',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.provinceId': {
      label: 'Tỉnh thành',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'Quận huyện',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = UserConfigs._rawProperties as
    EntityPropertySchema<typeof UserConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    phone: '',
    gender: 'M' as 'M' | 'F',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    avatar: '',
    status: '1',
    roles: [] as string[],
  };

  static createUpdateFormSchema = z.object({
    username: z.string().min(2, MessageUtils.min(UserConfigs.properties.username.label, 2)),
    password: z.string(),
    fullname: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string(),
    'address.districtId': z.string(),
    avatar: z.string(),
    status: z.string(),
    roles: z.array(z.string()).nonempty(),
  });
}

export default UserConfigs;
