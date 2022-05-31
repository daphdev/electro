export interface ProvinceResponse {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  code: string,
}

export interface ProvinceRequest {
  name: string,
  code: string,
}
