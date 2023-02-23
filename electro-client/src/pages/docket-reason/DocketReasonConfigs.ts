import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';

class DocketReasonConfigs extends Configs {
  static managerPath = ManagerPath.DOCKET_REASON;
  static resourceUrl = ResourceURL.DOCKET_REASON;
  static resourceKey = 'docket-reasons';
  static createTitle = 'Thêm lý do phiếu NXK';
  static updateTitle = 'Cập nhật lý do phiếu NXK';
  static manageTitle = 'Quản lý lý do phiếu NXK';

  static manageTitleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên lý do phiếu NXK',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái lý do phiếu NXK',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = DocketReasonConfigs._rawProperties as
    EntityPropertySchema<typeof DocketReasonConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(DocketReasonConfigs.properties.name.label, 2)),
    status: z.string(),
  });
}

export default DocketReasonConfigs;
