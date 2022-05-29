import { z } from 'zod';
import { EntityPropertyNames, EntityPropertyType } from '../../utils/EntityUtils';
import MessageUtils from '../../utils/MessageUtils';
import ResourceURL from '../../constants/ResourceURL';

export interface ProvinceResponse {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  code: string,
}

export interface ProvinceRequest {
  name: string,
  code: string,
}

export default class Configs {
  static managerPath = 'address/province';
  static createLabel = 'Thêm tỉnh thành';
  static updateLabel = 'Cập nhật tỉnh thành';
  static resourceUrl = ResourceURL.PROVINCE;

  static properties: EntityPropertyNames = {
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
    name: {
      label: 'Tên tỉnh thành',
      type: EntityPropertyType.STRING,
    },
    code: {
      label: 'Mã tỉnh thành',
      type: EntityPropertyType.STRING,
    },
  };

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(Configs.properties.name.label, 2)),
    code: z.string().max(35, MessageUtils.max(Configs.properties.code.label, 35)),
  });
}
