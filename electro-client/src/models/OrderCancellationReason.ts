import BaseResponse from 'models/BaseResponse';

export interface OrderCancellationReasonResponse extends BaseResponse {
  name: string;
  note: string | null;
  status: number;
}

export interface OrderCancellationReasonRequest {
  name: string;
  note: string | null;
  status: number;
}
