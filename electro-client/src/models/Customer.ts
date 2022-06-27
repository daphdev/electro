import BaseResponse from 'models/BaseResponse';
import { UserRequest, UserResponse } from 'models/User';
import { CustomerResourceResponse } from 'models/CustomerResource';
import { CustomerGroupResponse } from 'models/CustomerGroup';
import { CustomerStatusResponse } from 'models/CustomerStatus';

export interface CustomerResponse extends BaseResponse {
  user: UserResponse;
  customerGroup: CustomerGroupResponse;
  customerStatus: CustomerStatusResponse;
  customerResource: CustomerResourceResponse;
}

export interface CustomerRequest {
  user: UserRequest;
  customerGroupId: number;
  customerStatusId: number;
  customerResourceId: number;
}
