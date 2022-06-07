/**
 * RequestParams dùng để chứa các query param
 */
export interface RequestParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
  search?: string;
  all?: number;
}

/**
 * ListResponse dùng để thể hiện đối tượng trả về sau lệnh getAll
 */
export interface ListResponse<O = unknown> {
  content: O[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/**
 * ErrorMessage dùng để thể hiện đối tượng lỗi trả về sau lệnh fetch
 */
export interface ErrorMessage {
  statusCode: number;
  timestamp: string;
  message: string;
  description: string;
}

class FetchUtils {
  /**
   * Hàm getAll dùng để lấy danh sách tất cả đối tượng (có thể theo một số tiêu chí, cài đặt trong requestParams)
   * @param url
   * @param requestParams
   */
  static async getAll<O>(url: string, requestParams?: RequestParams): Promise<[number, ListResponse<O> | ErrorMessage]> {
    const response = await fetch(this.concatParams(url, requestParams));
    return [response.status, await response.json()];
  }

  /**
   * Hàm getById dùng để lấy entity có id cho trước
   * @param url
   * @param entityId
   */
  static async getById<O>(url: string, entityId: number): Promise<[number, O | ErrorMessage]> {
    const response = await fetch(url + '/' + entityId);
    return [response.status, await response.json()];
  }

  /**
   * Hàm create dùng để tạo entity từ requestBody
   * @param url
   * @param requestBody
   */
  static async create<I, O>(url: string, requestBody: I): Promise<[number, O | ErrorMessage]> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    return [response.status, await response.json()];
  }

  /**
   * Hàm update dùng để cập nhật entity theo id và requestBody nhận được
   * @param url
   * @param entityId
   * @param requestBody
   */
  static async update<I, O>(url: string, entityId: number, requestBody: I): Promise<[number, O | ErrorMessage]> {
    const response = await fetch(url + '/' + entityId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    return [response.status, await response.json()];
  }

  /**
   * Hàm deleteById xóa entity theo id nhận được và trả về response status (thành công: 204, thất bại: 500)
   * @param url
   * @param entityId
   */
  static async deleteById(url: string, entityId: number) {
    const response = await fetch(url + '/' + entityId, { method: 'DELETE' });
    return response.status;
  }

  /**
   * Hàm deleteByIds xóa hàng loạt entity theo mảng id nhận được và trả về response status (204, 500)
   * @param url
   * @param entityIds
   */
  static async deleteByIds(url: string, entityIds: number[]) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entityIds),
    });
    return response.status;
  }

  /**
   * Hàm concatParams dùng để nối url và requestParams
   * @param url
   * @param requestParams
   */
  static concatParams = (url: string, requestParams?: RequestParams) => {
    if (requestParams) {
      const filteredRequestParams = Object.fromEntries(Object.entries(requestParams)
        .filter(([, v]) => v != null && String(v).trim() !== ''));
      if (Object.keys(filteredRequestParams).length === 0) {
        return url;
      }
      return url + '?' + new URLSearchParams(filteredRequestParams).toString();
    }
    return url;
  };
}

export default FetchUtils;
