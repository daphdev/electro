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
   * @param resourceUrl
   * @param requestParams
   */
  static async getAll<O>(resourceUrl: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
    const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams));
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm getById dùng để lấy entity có id cho trước
   * @param resourceUrl
   * @param entityId
   */
  static async getById<O>(resourceUrl: string, entityId: number): Promise<O> {
    const response = await fetch(resourceUrl + '/' + entityId);
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm create dùng để tạo entity từ requestBody
   * @param resourceUrl
   * @param requestBody
   */
  static async create<I, O>(resourceUrl: string, requestBody: I): Promise<O> {
    const response = await fetch(resourceUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm update dùng để cập nhật entity theo id và requestBody nhận được
   * @param resourceUrl
   * @param entityId
   * @param requestBody
   */
  static async update<I, O>(resourceUrl: string, entityId: number, requestBody: I): Promise<O> {
    const response = await fetch(resourceUrl + '/' + entityId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm deleteById xóa entity theo id nhận được
   * @param resourceUrl
   * @param entityId
   */
  static async deleteById(resourceUrl: string, entityId: number) {
    const response = await fetch(resourceUrl + '/' + entityId, { method: 'DELETE' });
    if (!response.ok) {
      throw await response.json();
    }
  }

  /**
   * Hàm deleteByIds xóa hàng loạt entity theo mảng id nhận được
   * @param resourceUrl
   * @param entityIds
   */
  static async deleteByIds(resourceUrl: string, entityIds: number[]) {
    const response = await fetch(resourceUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entityIds),
    });
    if (!response.ok) {
      throw await response.json();
    }
  }

  /**
   * Hàm concatParams dùng để nối url và requestParams
   * @param url
   * @param requestParams
   */
  private static concatParams = (url: string, requestParams?: RequestParams) => {
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
