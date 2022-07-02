import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class CustomerConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER;
  static resourceUrl = ResourceURL.CUSTOMER;
  static resourceKey = 'customers';
  static createTitle = 'Thêm khách hàng';
  static updateTitle = 'Cập nhật khách hàng';
  static manageTitle = 'Quản lý khách hàng';

  static CUSTOMER_ROLE_ID = 3;

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.CUSTOMER,
      label: 'Quản lý khách hàng',
    },
    {
      link: ManagerPath.CUSTOMER_GROUP,
      label: 'Quản lý nhóm khách hàng',
    },
    {
      link: ManagerPath.CUSTOMER_STATUS,
      label: 'Quản lý trạng thái khách hàng',
    },
    {
      link: ManagerPath.CUSTOMER_RESOURCE,
      label: 'Quản lý nguồn khách hàng',
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
      isShowInTable: true,
    },
    'user.gender': {
      label: 'Giới tính',
      type: EntityPropertyType.OPTION,
    },
    'user.address.line': {
      label: 'Địa chỉ khách hàng',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.name': {
      label: 'Tên tỉnh thành khách hàng',
      type: EntityPropertyType.STRING,
    },
    'user.address.province.code': {
      label: 'Mã tỉnh thành khách hàng',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.name': {
      label: 'Tên quận huyện khách hàng',
      type: EntityPropertyType.STRING,
    },
    'user.address.district.code': {
      label: 'Mã quận huyện khách hàng',
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
    'customerGroup.name': {
      label: 'Tên nhóm khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerGroupId: {
      label: 'Nhóm khách hàng',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'customerStatus.name': {
      label: 'Tên trạng thái khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerStatusId: {
      label: 'Trạng thái khách hàng',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'customerResource.name': {
      label: 'Tên nguồn khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    customerResourceId: {
      label: 'Nguồn khách hàng',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = CustomerConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerConfigs._rawProperties & typeof PageConfigs.properties>;

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
    'user.roles': [String(CustomerConfigs.CUSTOMER_ROLE_ID)],
    customerGroupId: null as string | null,
    customerStatusId: null as string | null,
    customerResourceId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    'user.username': z.string().min(2, MessageUtils.min(CustomerConfigs.properties['user.username'].label, 2)),
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
    customerGroupId: z.string(),
    customerStatusId: z.string(),
    customerResourceId: z.string(),
  });
}

export default CustomerConfigs;
