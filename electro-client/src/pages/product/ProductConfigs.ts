import { z } from 'zod';
import { Configs, EntityPropertySchema, EntityPropertyType, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import PageConfigs from 'pages/PageConfigs';
import ManagerPath from 'constants/ManagerPath';
import { CollectionWrapper, ImageItem, ProductPropertyItem, SpecificationItem } from 'models/Product';
import { VariantRequest } from 'models/Variant';

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
    ...PageConfigs.getProperties(true),
    name: {
      label: 'Tên sản phẩm',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    code: {
      label: 'Mã sản phẩm',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    slug: {
      label: 'Slug sản phẩm',
      type: EntityPropertyType.STRING,
    },
    shortDescription: {
      label: 'Mô tả ngắn sản phẩm',
      type: EntityPropertyType.STRING,
    },
    description: {
      label: 'Mô tả sản phẩm',
      type: EntityPropertyType.STRING,
    },
    thumbnail: {
      label: 'Hình đại diện',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    images: {
      label: 'Hình ảnh sản phẩm',
      type: EntityPropertyType.COLLECTION,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    status: {
      label: 'Trạng thái sản phẩm',
      type: EntityPropertyType.NUMBER,
      isShowInTable: true,
    },
    'category.name': {
      label: 'Tên danh mục sản phẩm',
      type: EntityPropertyType.STRING,
      isShowInTable: true,
    },
    'brand.name': {
      label: 'Tên nhãn hiệu',
      type: EntityPropertyType.STRING,
    },
    'supplier.displayName': {
      label: 'Tên nhà cung cấp',
      type: EntityPropertyType.STRING,
    },
    'unit.name': {
      label: 'Tên đơn vị tính',
      type: EntityPropertyType.STRING,
    },
    tags: {
      label: 'Danh sách tag',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    specifications: {
      label: 'Thông số sản phẩm',
      type: EntityPropertyType.COLLECTION,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    properties: {
      label: 'Thuộc tính sản phẩm',
      type: EntityPropertyType.COLLECTION,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    variants: {
      label: 'Phiên bản',
      type: EntityPropertyType.ARRAY,
      isShowInTable: true,
      isNotAddToSortCriteria: true,
      isNotAddToFilterCriteria: true,
    },
    weight: {
      label: 'Khối lượng sản phẩm',
      type: EntityPropertyType.NUMBER,
    },
    'guarantee.name': {
      label: 'Tên bảo hành sản phẩm',
      type: EntityPropertyType.STRING,
    },
  };

  static properties = ProductConfigs._rawProperties as
    EntityPropertySchema<typeof ProductConfigs._rawProperties & typeof PageConfigs.properties>;

  static initialCreateUpdateFormValues = {
    name: '',
    code: '',
    slug: '',
    shortDescription: '',
    description: '',
    thumbnail: '',
    images: null as CollectionWrapper<ImageItem> | null,
    status: '1',
    categoryId: null as string | null,
    brandId: null as string | null,
    supplierId: null as string | null,
    unitId: null as string | null,
    tags: [] as string[],
    specifications: null as CollectionWrapper<SpecificationItem> | null,
    properties: null as CollectionWrapper<ProductPropertyItem> | null,
    variants: [] as VariantRequest[],
    weight: 0.0,
    guaranteeId: null as string | null,
  };

  static createUpdateFormSchema = z.object({
    name: z.string().min(2, MessageUtils.min(ProductConfigs.properties.name.label, 2)),
    code: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    images: z.object({}).nullable(),
    status: z.string(),
    categoryId: z.string().nullable(),
    brandId: z.string().nullable(),
    supplierId: z.string().nullable(),
    unitId: z.string().nullable(),
    tags: z.array(z.string()),
    specifications: z.object({}).nullable(),
    properties: z.object({}).nullable(),
    variants: z.array(z.object({})),
    weight: z.number(),
    guaranteeId: z.string().nullable(),
  });
}

export default ProductConfigs;
