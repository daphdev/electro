import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import { CountVariantRequest } from 'models/CountVariant';

class CountConfigs extends Configs {
  static managerPath = ManagerPath.COUNT;
  static resourceUrl = ResourceURL.COUNT;
  static resourceKey = 'counts';
  static createTitle = 'Thêm phiếu kiểm kho';
  static updateTitle = 'Cập nhật phiếu kiểm kho';
  static manageTitle = 'Quản lý phiếu kiểm kho';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true),
    code: {
      label: 'Mã phiếu kiểm kho',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    totalVariants: {
      label: 'Số mặt hàng',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    'warehouse.name': {
      label: 'Tên nhà kho',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái phiếu kiểm kho',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = CountConfigs._rawProperties as
    EntityPropertySchema<typeof CountConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    warehouseId: null as string | null,
    countVariants: [] as CountVariantRequest[],
    note: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string().min(5, MessageUtils.min(CountConfigs.properties.code.label, 5)),
    warehouseId: z.string({ invalid_type_error: 'Vui lòng không bỏ trống' }),
    countVariants: z.array(z.object({
      variantId: z.number(),
      inventory: z.number(),
      actualInventory: z.number(),
    })).min(1, 'Cần thêm ít nhất 1 mặt hàng'),
    note: z.string(),
    status: z.string(),
  });
}

export default CountConfigs;
