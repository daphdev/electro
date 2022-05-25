/**
 * RequestParams dùng để chứa các query param
 */
export interface RequestParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
  search?: string;
  all?: number
}

/**
 * ResponseData dùng để thể hiện đối tượng trả về sau lệnh getAll
 */
export interface ResponseData<T> {
  content: T[],
  page: number,
  size: number,
  totalElements: number,
  totalPages: number,
  last: boolean
}

export default class FetchUtils {
  /**
   * Hàm getAll dùng để lấy danh sách tất cả đối tượng (có thể theo một số tiêu chí, cài đặt trong requestParams)
   * @param url
   * @param requestParams
   */
  static async getAll<T>(url: string, requestParams?: RequestParams): Promise<ResponseData<T>> {
    const response = await fetch(this.concatParams(url, requestParams));
    return await response.json();
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
  }
}
