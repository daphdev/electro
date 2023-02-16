import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import { OrderVariantRequest } from 'models/OrderVariant';
import ApplicationConstants from 'constants/ApplicationConstants';

class OrderConfigs extends Configs {
  static managerPath = ManagerPath.ORDER;
  static resourceUrl = ResourceURL.ORDER;
  static resourceKey = 'orders';
  static createTitle = 'Thêm đơn hàng';
  static updateTitle = 'Cập nhật đơn hàng';
  static manageTitle = 'Quản lý đơn hàng';

  static manageTitleLinks: TitleLink[] = OrderResourceConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Mã đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'orderResource.name': {
      label: 'Tên nguồn đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    user: {
      label: 'Người đặt hàng',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    to: {
      label: 'Người nhận hàng',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    totalPay: {
      label: 'Tổng tiền trả',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    warehouse: {
      label: 'Kho',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Trạng thái đơn hàng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = OrderConfigs._rawProperties as
    EntityPropertySchema<typeof OrderConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    status: '1',
    toName: '',
    toPhone: '',
    toAddress: '',
    toWardName: '',
    toDistrictName: '',
    toProvinceName: '',
    orderResourceId: '1',
    orderCancellationReasonId: null as string | null,
    note: '',
    userId: null as string | null,
    orderVariants: [] as OrderVariantRequest[],
    totalAmount: 0,
    tax: ApplicationConstants.DEFAULT_TAX,
    shippingCost: ApplicationConstants.DEFAULT_SHIPPING_COST,
    totalPay: ApplicationConstants.DEFAULT_SHIPPING_COST,
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(OrderConfigs.properties.code.label, 5)),
    status: z.string(),
    toName: z.string(),
    toPhone: z.string(),
    toAddress: z.string(),
    toWardName: z.string(),
    toDistrictName: z.string(),
    toProvinceName: z.string(),
    orderResourceId: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    orderCancellationReasonId: z.string().nullable(),
    note: z.string(),
    userId: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    orderVariants: z.array(z.object({
      variantId: z.number(),
      price: z.number(),
      quantity: z.number(),
      amount: z.number(),
    })).min(1, 'Cần thêm ít nhất 1 mặt hàng'),
    totalAmount: z.number().min(0),
    tax: z.number().min(0),
    shippingCost: z.number().min(0),
    totalPay: z.number().min(0),
  });
}

export default OrderConfigs;
