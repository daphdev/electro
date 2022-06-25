import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import CustomerConfigs from 'pages/customer/CustomerConfigs';

class CustomerStatusConfigs extends Configs {
  static managerPath = ManagerPath.CUSTOMER_STATUS;
  static resourceUrl = ResourceURL.CUSTOMER_STATUS;
  static resourceKey = 'customer-status';
  static createTitle = 'Thêm trạng thái khách hàng';
  static updateTitle = 'Cập nhật trạng thái khách hàng';
  static manageTitle = 'Quản lý trạng thái khách hàng';

  static manageTitleLinks: TitleLink[] = CustomerConfigs.manageTitleLinks;

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true),
    code: {
      label: 'Mã trạng thái khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    name: {
      label: 'Tên trạng thái khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    description: {
      label: 'Mô tả trạng thái khách hàng',
      type: EntityPropertyType.STRING,
    },
    color: {
      label: 'Màu trạng thái khách hàng',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    status: {
      label: 'Trạng thái trạng thái khách hàng',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
  };

  static properties = CustomerStatusConfigs._rawProperties as
    EntityPropertySchema<typeof CustomerStatusConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    code: '',
    name: '',
    description: '',
    color: '',
    status: '1',
  };

  static createUpdateFormSchema = z.object({
    code: z.string(),
    name: z.string().min(2, MessageUtils.min(CustomerStatusConfigs.properties.name.label, 2)),
    description: z.string(),
    color: z.string(),
    status: z.string(),
  });
}

export default CustomerStatusConfigs;
