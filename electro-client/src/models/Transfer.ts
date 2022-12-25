import BaseResponse from 'models/BaseResponse';
import { DocketRequest, DocketResponse } from 'models/Docket';

export interface TransferResponse extends BaseResponse {
  code: string;
  exportDocket: DocketResponse;
  importDocket: DocketResponse;
  note: string | null;
}

export interface TransferRequest {
  code: string;
  exportDocket: DocketRequest;
  importDocket: DocketRequest;
  note: string | null;
}
