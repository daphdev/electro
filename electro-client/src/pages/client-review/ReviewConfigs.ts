import { TitleLink } from 'types';
import ManagerPath from 'constants/ManagerPath';
import ResourceURL from 'constants/ResourceURL';

class ReviewConfigs {
  static title = 'Quản lý đánh giá sản phẩm';
  static titleLinks: TitleLink[] = [
    {
      link: ManagerPath.REVIEW,
      label: 'Quản lý đánh giá sản phẩm',
    },
  ];
  static resourceUrl = ResourceURL.REVIEW;
  static resourceKey = 'reviews';
}

export default ReviewConfigs;
