import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { DocketVariantRequest } from 'models/DocketVariant';

class TransferConfigs extends Configs {
  static managerPath = ManagerPath.TRANSFER;
  static resourceUrl = ResourceURL.TRANSFER;
  static resourceKey = 'transfers';
  static createTitle = 'Thêm phiếu chuyển kho';
  static updateTitle = 'Cập nhật phiếu chuyển kho';
  static manageTitle = 'Quản lý phiếu chuyển kho';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Mã phiếu chuyển kho',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'exportDocket.warehouse.name': {
      label: 'Tên kho xuất',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'exportDocket.status': {
      label: 'Trạng thái phiếu xuất',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    arrow: {
      label: '',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'importDocket.warehouse.name': {
      label: 'Tên kho nhập',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'importDocket.status': {
      label: 'Trạng thái phiếu nhập',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    note: {
      label: 'Ghi chú phiếu chuyển kho',
      type: EntityPropertyType.STRING,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = TransferConfigs._rawProperties as
    EntityPropertySchema<typeof TransferConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    'exportDocket.warehouseId': null as string | null,
    'importDocket.warehouseId': null as string | null,
    docketVariants: [] as DocketVariantRequest[],
    note: '',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(TransferConfigs.properties.code.label, 5)),
    'exportDocket.warehouseId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    'importDocket.warehouseId': z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    docketVariants: z.array(z.object({
      variantId: z.number(),
      quantity: z.number(),
    })).min(1, 'Cần thêm ít nhất 1 mặt hàng'),
    note: z.string(),
  });
}

export default TransferConfigs;
