import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class WarehouseConfigs extends Configs {
  static managerPath = ManagerPath.WAREHOUSE;
  static resourceUrl = ResourceURL.WAREHOUSE;
  static resourceKey = 'warehouses';
  static createTitle = 'Thêm nhà kho';
  static updateTitle = 'Cập nhật nhà kho';
  static manageTitle = 'Quản lý nhà kho';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.INVENTORY,
      label: 'Theo dõi tồn kho',
    },
    {
      link: ManagerPath.WAREHOUSE,
      label: 'Quản lý nhà kho',
    },
    {
      link: ManagerPath.PURCHASE_ORDER,
      label: 'Quản lý đơn mua hàng',
    },
    {
      link: ManagerPath.DESTINATION,
      label: 'Quản lý điểm nhập hàng',
    },
    {
      link: ManagerPath.DOCKET,
      label: 'Quản lý phiếu nhập xuất kho',
    },
    {
      link: ManagerPath.DOCKET_REASON,
      label: 'Quản lý lý do phiếu NXK',
    },
    {
      link: ManagerPath.COUNT,
      label: 'Quản lý phiếu kiểm kho',
    },
    {
      link: ManagerPath.TRANSFER,
      label: 'Quản lý phiếu chuyển kho',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    code: {
      label: 'Mã nhà kho',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Tên nhà kho',
      type: EntityPropertyType.STRING,
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
    'address.district.name': {
      label: 'Tên quận huyện',
      type: EntityPropertyType.STRING,
    },
    status: {
      label: 'Trạng thái nhà kho',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
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

  static properties = WarehouseConfigs._rawProperties as
    EntityPropertySchema<typeof WarehouseConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    'address.line': '',
    'address.provinceId': null as string | null,
    'address.districtId': null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(WarehouseConfigs.properties.name.label, 2)),
    'address.line': z.string(),
    'address.provinceId': z.string().nullable(),
    'address.districtId': z.string().nullable(),
    status: z.string(),
  });
}

export default WarehouseConfigs;
