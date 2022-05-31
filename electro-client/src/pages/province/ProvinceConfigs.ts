import { z } from 'zod';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import { EntityPropertyNames, EntityPropertyType } from 'models/EntityProperty';

export default class ProvinceConfigs {
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
    name: z.string().min(2, MessageUtils.min(ProvinceConfigs.properties.name.label, 2)),
    code: z.string().max(35, MessageUtils.max(ProvinceConfigs.properties.code.label, 35)),
  });
}
