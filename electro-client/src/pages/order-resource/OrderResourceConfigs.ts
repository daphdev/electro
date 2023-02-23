import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class OrderResourceConfigs extends Configs {
  static managerPath = ManagerPath.ORDER_RESOURCE;
  static resourceUrl = ResourceURL.ORDER_RESOURCE;
  static resourceKey = 'order-resources';
  static createTitle = 'Thêm nguồn đơn hàng';
  static updateTitle = 'Cập nhật nguồn đơn hàng';
  static manageTitle = 'Quản lý nguồn đơn hàng';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.ORDER,
      label: 'Quản lý đơn hàng',
    },
    {
      link: ManagerPath.ORDER_RESOURCE,
      label: 'Quản lý nguồn đơn hàng',
    },
    {
      link: ManagerPath.ORDER_CANCELLATION_REASON,
      label: 'Quản lý lý do hủy đơn hàng',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Mã nguồn đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Tên nguồn đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    color: {
      label: 'Màu nguồn đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
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
    status: {
      label: 'Trạng thái nguồn đơn hàng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = OrderResourceConfigs._rawProperties as
    EntityPropertySchema<typeof OrderResourceConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    color: '',
    customerResourceId: null as string | null,
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(OrderResourceConfigs.properties.name.label, 2)),
    color: z.string(),
    customerResourceId: z.string().nullable(),
    status: z.string(),
  });
}

export default OrderResourceConfigs;
