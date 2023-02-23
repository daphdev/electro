import { Configs, TitleLink } from 'types';
import ManagerPath from 'constants/ManagerPath';
import ResourceURL from 'constants/ResourceURL';

class ReviewConfigs extends Configs {
  static resourceUrl = ResourceURL.REVIEW;
  static resourceKey = 'reviews';
  static manageTitle = 'Quản lý đánh giá sản phẩm';
  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.REVIEW,
      label: 'Quản lý đánh giá sản phẩm',
    },
  ];
}

export default ReviewConfigs;
