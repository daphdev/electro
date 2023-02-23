import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { PurchaseOrderVariantRequest } from 'models/PurchaseOrderVariant';
import MessageUtils from 'utils/MessageUtils';

class PurchaseOrderConfigs extends Configs {
  static managerPath = ManagerPath.PURCHASE_ORDER;
  static resourceUrl = ResourceURL.PURCHASE_ORDER;
  static resourceKey = 'purchase-orders';
  static createTitle = 'Thêm đơn mua hàng';
  static updateTitle = 'Cập nhật đơn mua hàng';
  static manageTitle = 'Quản lý đơn mua hàng';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Mã đơn mua hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'supplier.displayName': {
      label: 'Tên nhà cung cấp',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'destination.address.line': {
      label: 'Địa chỉ điểm nhập hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    totalAmount: {
      label: 'Tổng thành tiền',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    note: {
      label: 'Ghi chú đơn mua hàng',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    warehouse: {
      label: 'Kho',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Trạng thái đơn mua hàng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = PurchaseOrderConfigs._rawProperties as
    EntityPropertySchema<typeof PurchaseOrderConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    supplierId: null as string | null,
    purchaseOrderVariants: [] as PurchaseOrderVariantRequest[],
    destinationId: null as string | null,
    totalAmount: 0,
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(PurchaseOrderConfigs.properties.code.label, 5)),
    supplierId: z.string(),
    purchaseOrderVariants: z.array(z.object({
      variantId: z.number(),
      cost: z.number(),
      quantity: z.number(),
      amount: z.number(),
    })).min(1, 'Cần thêm ít nhất 1 mặt hàng'),
    destinationId: z.string(),
    totalAmount: z.number().min(0),
    note: z.string(),
    status: z.string(),
  });
}

export default PurchaseOrderConfigs;
