import { Configs, TitleLink } from 'types';
import ResourceURL from 'constants/ResourceURL';
import ManagerPath from 'constants/ManagerPath';

class RewardConfigs extends Configs {
  static resourceUrl = ResourceURL.REWARD;
  static resourceKey = 'rewards';
  static manageTitle = 'Quản lý chiến lược điểm thưởng';
  static manageTitleLinks: TitleLink[] = [
    {
      link: ManagerPath.REWARD,
      label: 'QL chiến lược điểm thưởng',
    },
  ];
}

export default RewardConfigs;
