import { z } from 'zod';
import ResourceURL from 'constants/ResourceURL';
import MessageUtils from 'utils/MessageUtils';
import { EntityPropertyNames, EntityPropertyType } from 'models/EntityProperty';
import { TitleLink } from 'types';
import { ListResponse } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';
import { SelectOption } from 'types/SelectOption';

class ProvinceConfigs {
  static managerPath = 'address/province';
  static createTitle = 'Thêm tỉnh thành';
  static updateTitle = 'Cập nhật tỉnh thành';
  static manageTitle = 'Quản lý tỉnh thành';
  static resourceUrl = ResourceURL.PROVINCE;

  static manageTitleLinks: TitleLink[] = [
    {
      link: '/admin/address',
      label: 'Quản lý địa chỉ',
    },
    {
      link: '/admin/address/province',
      label: 'Quản lý tỉnh thành',
    },
    {
      link: '/admin/address/district',
      label: 'Quản lý quận huyện',
    },
  ];

  static initialListResponse: ListResponse<ProvinceResponse> = {
    content: [],
    page: 1,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    last: false,
  };

  static initialPropertySelectList: SelectOption[] = [
    {
      value: 'id',
      label: 'ID',
    },
    {
      value: 'createdAt',
      label: 'Ngày tạo',
    },
    {
      value: 'updatedAt',
      label: 'Ngày cập nhật',
    },
    {
      value: 'name',
      label: 'Tên tỉnh thành',
    },
    {
      value: 'code',
      label: 'Mã tỉnh thành',
    },
  ];

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

export default ProvinceConfigs;
