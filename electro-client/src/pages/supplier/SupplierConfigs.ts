import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import ProductConfigs from 'pages/product/ProductConfigs';

class SupplierConfigs extends Configs {
  static managerPath = ManagerPath.SUPPLIER;
  static resourceUrl = ResourceURL.SUPPLIER;
  static resourceKey = 'suppliers';
  static createTitle = 'Thêm nhà cung cấp';
  static updateTitle = 'Cập nhật nhà cung cấp';
  static manageTitle = 'Quản lý nhà cung cấp';

  static manageTitleLinks: TitleLink[] = ProductConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    displayName: {
      label: 'Tên hiển thị nhà cung cấp',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Mã nhà cung cấp',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    contactFullname: {
      label: 'Họ và tên người liên hệ',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    contactEmail: {
      label: 'Email người liên hệ',
      type: EntityPropertyType.STRING,
    },
    contactPhone: {
      label: 'Số điện thoại người liên hệ',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    companyName: {
      label: 'Tên công ty',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    taxCode: {
      label: 'Mã số thuế công ty',
      type: EntityPropertyType.STRING,
    },
    email: {
      label: 'Email công ty',
      type: EntityPropertyType.STRING,
    },
    phone: {
      label: 'Số điện thoại công ty',
      type: EntityPropertyType.STRING,
    },
    fax: {
      label: 'Fax công ty',
      type: EntityPropertyType.STRING,
    },
    website: {
      label: 'Website công ty',
      type: EntityPropertyType.STRING,
    },
    'address.line': {
      label: 'Địa chỉ công ty',
      type: EntityPropertyType.STRING,
    },
    'address.province.name': {
      label: 'Tên tỉnh thành công ty',
      type: EntityPropertyType.STRING,
    },
    'address.district.name': {
      label: 'Tên quận huyện công ty',
      type: EntityPropertyType.STRING,
    },
    'address.provinceId': {
      label: 'Tỉnh thành công ty',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'address.districtId': {
      label: 'Quận huyện công ty',
      type: EntityPropertyType.NUMBER,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    description: {
      label: 'Mô tả công ty',
      type: EntityPropertyType.STRING,
    },
    note: {
      label: 'Ghi chú công ty',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Trạng thái nhà cung cấp',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = SupplierConfigs._rawProperties as
    EntityPropertySchema<typeof SupplierConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    displayName: '',
    code: '',
    contactFullname: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    taxCode: '',
    email: '',
    phone: '',
    fax: '',
    website: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    description: '',
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    displayName: z.string().min(2, MessageUtils.min(SupplierConfigs.properties.displayName.label, 2)),
    code: z.string(),
    contactFullname: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    companyName: z.string(),
    taxCode: z.string(),
    email: z.string(),
    phone: z.string(),
    fax: z.string(),
    website: z.string(),
    'address.line': z.string(),
    'address.provinceId': z.string().nullable(),
    'address.districtId': z.string().nullable(),
    description: z.string(),
    note: z.string(),
    status: z.string(),
  });
}

export default SupplierConfigs;
