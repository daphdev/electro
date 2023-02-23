import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import { RequiredNote } from 'models/Waybill';
import DateUtils from 'utils/DateUtils';

class WaybillConfigs extends Configs {
  static managerPath = ManagerPath.WAYBILL;
  static resourceUrl = ResourceURL.WAYBILL;
  static resourceKey = 'waybills';
  static createTitle = 'Thêm vận đơn';
  static updateTitle = 'Cập nhật vận đơn';
  static manageTitle = 'Quản lý vận đơn';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.WAYBILL,
      label: 'Quản lý vận đơn',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Mã vận đơn',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'order.code': {
      label: 'Mã đơn hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    shippingDate: {
      label: 'Ngày gửi hàng',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    expectedDeliveryTime: {
      label: 'Thời gian giao dự kiến',
      type: EntityPropertyType.DATE,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái vận đơn',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    codAmount: {
      label: 'Tiền thu hộ',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    shippingFee: {
      label: 'Phí vận chuyển',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    size: {
      label: 'Thông số kiện hàng',
      type: EntityPropertyType.PLACEHOLDER,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
  };

  static properties = WaybillConfigs._rawProperties as
    EntityPropertySchema<typeof WaybillConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    orderId: null as string | null,
    shippingDate: DateUtils.today(),
    weight: 1,
    length: 1,
    width: 1,
    height: 1,
    note: '',
    ghnRequiredNote: RequiredNote.KHONGCHOXEMHANG,
  };

  static createUpdateFormSchema = z.object({
    orderId: z.string({ invalid_type_error: 'Vui lòng không để trống' }),
    shippingDate: z.date({ invalid_type_error: 'Vui lòng không để trống' }),
    weight: z.number().min(1),
    length: z.number().min(1),
    width: z.number().min(1),
    height: z.number().min(1),
    note: z.string(),
    ghnRequiredNote: z.string(),
  });

  static ghnRequiredNoteMap: Record<RequiredNote, string> = {
    [RequiredNote.CHOTHUHANG]: 'Cho thử hàng',
    [RequiredNote.CHOXEMHANGKHONGTHU]: 'Cho xem hàng, không cho thử',
    [RequiredNote.KHONGCHOXEMHANG]: 'Không cho xem hàng',
  };

  static ghnPaymentTypeIdMap: Record<number, string> = {
    1: 'Người bán',
    2: 'Người mua',
  };
}

export default WaybillConfigs;
