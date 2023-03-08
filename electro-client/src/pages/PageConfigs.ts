import { EntityPropertySchema, EntityPropertyType, SelectOption } from 'types';
import { ListResponse } from 'utils/FetchUtils';
import {
  Box,
  BrandPaypal,
  Briefcase,
  Cash,
  Cpu,
  DeviceGamepad2,
  DeviceLaptop,
  DevicesPc,
  DeviceSpeaker,
  DeviceTablet,
  DeviceWatch,
  Icon,
  Keyboard,
  Mouse
} from 'tabler-icons-react';
import { PaymentMethodType } from 'models/PaymentMethod';

class PageConfigs {
  static properties = {
    id: {
      label: 'ID',
      type: EntityPropertyType.NUMBER,
    },
    createdAt: {
      label: 'Ngày tạo',
      type: EntityPropertyType.DATE,
    },
    updatedAt: {
      label: 'Ngày cập nhật',
      type: EntityPropertyType.DATE,
    },
    createdBy: {
      label: 'Người tạo',
      type: EntityPropertyType.NUMBER,
    },
    updatedBy: {
      label: 'Người cập nhật',
      type: EntityPropertyType.NUMBER,
    },
  };

  static getProperties = (...isShowInTable: boolean[]): EntityPropertySchema => {
    const properties = JSON.parse(JSON.stringify(PageConfigs.properties)) as EntityPropertySchema;
    Object.values(properties).forEach(
      (value, index) => isShowInTable[index] && (value.isShowInTable = isShowInTable[index])
    );
    return properties;
  };

  static initialListResponse: ListResponse = {
    content: [],
    page: 1,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    last: false,
  };

  static initialPageSizeSelectList: SelectOption[] = [
    {
      value: '5',
      label: '5',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '25',
      label: '25',
    },
    {
      value: '50',
      label: '50',
    },
  ];

  static categorySlugIconMap: Record<string, Icon> = new Proxy(
    {
      'laptop': DeviceLaptop,
      'loa': DeviceSpeaker,
      'ban-phim': Keyboard,
      'may-choi-game': DeviceGamepad2,
      'chuot': Mouse,
      'cpu': Cpu,
      'pc': DevicesPc,
      'balo': Briefcase,
      'tablet': DeviceTablet,
      'smartwatch': DeviceWatch,
    },
    {
      get: function (target: Record<string, Icon>, name: string) {
        return Object.prototype.hasOwnProperty.call(target, name) ? target[name] : Box;
      },
    }
  );

  static paymentMethodIconMap: Record<PaymentMethodType, Icon> = {
    [PaymentMethodType.CASH]: Cash,
    [PaymentMethodType.PAYPAL]: BrandPaypal,
  };

  static paymentMethodNameMap: Record<PaymentMethodType, string> = {
    [PaymentMethodType.CASH]: 'Thanh toán tiền mặt',
    [PaymentMethodType.PAYPAL]: 'Thanh toán PayPal',
  };
}

export default PageConfigs;
