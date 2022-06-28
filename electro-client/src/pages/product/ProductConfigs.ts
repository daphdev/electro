import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';

class ProductConfigs extends Configs {
  static managerPath = ManagerPath.PRODUCT;
  static resourceUrl = ResourceURL.PRODUCT;
  static resourceKey = 'products';
  static createTitle = 'Thêm sản phẩm';
  static updateTitle = 'Cập nhật sản phẩm';
  static manageTitle = 'Quản lý sản phẩm';

  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.PRODUCT,
      label: 'Quản lý sản phẩm',
    },
    {
      link: ManagerPath.CATEGORY,
      label: 'Quản lý danh mục sản phẩm',
    },
    {
      link: ManagerPath.BRAND,
      label: 'Quản lý nhãn hiệu',
    },
    {
      link: ManagerPath.SUPPLIER,
      label: 'Quản lý nhà cung cấp',
    },
    {
      link: ManagerPath.UNIT,
      label: 'Quản lý đơn vị tính',
    },
    {
      link: ManagerPath.TAG,
      label: 'Quản lý tag',
    },
    {
      link: ManagerPath.GUARANTEE,
      label: 'Quản lý bảo hành',
    },
    {
      link: ManagerPath.PROPERTY,
      label: 'Quản lý thuộc tính sản phẩm',
    },
    {
      link: ManagerPath.SPECIFICATION,
      label: 'Quản lý thông số sản phẩm',
    },
  ];

  protected static _rawProperties = {
    ...PageConfigs.getProperties(true, true, true),
    name: {
      label: 'Tên sản phẩm',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
  };

  static properties = ProductConfigs._rawProperties as
    EntityPropertySchema<typeof ProductConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(ProductConfigs.properties.name.label, 2)),
  });
}

export default ProductConfigs;
