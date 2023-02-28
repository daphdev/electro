import BaseResponse from 'models/BaseResponse';

export enum RewardStrategyType {
  SUCCESS_ORDER = 'SUCCESS_ORDER',
  ADD_REVIEW = 'ADD_REVIEW'
}

export interface RewardStrategyResponse extends BaseResponse {
  code: RewardStrategyType;
  name: string;
  formula: string;
  status: number;
}

export interface RewardStrategyRequest {
  formula: string;
  status: number;
}
