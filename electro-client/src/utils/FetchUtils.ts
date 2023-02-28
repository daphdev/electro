import ApplicationConstants from 'constants/ApplicationConstants';
import { CollectionWrapper } from 'types';
import { UploadedImageResponse } from 'models/Image';

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

type BasicRequestParams = Record<string, string | number | null | boolean>;

class FetchUtils {
  /**
   * Hàm get cho các trường hợp truy vấn dữ liệu bên client
   * @param resourceUrl
   * @param requestParams
   */
  static async get<O>(resourceUrl: string, requestParams?: BasicRequestParams): Promise<O> {
    const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams));
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm post cho các trường hợp thực hiện truy vấn POST
   * @param resourceUrl
   * @param requestBody
   */
  static async post<I, O>(resourceUrl: string, requestBody: I): Promise<O> {
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
   * Hàm put cho các trường hợp thực hiện truy vấn PUT
   * @param resourceUrl
   * @param requestBody
   * @param requestParams
   */
  static async put<I, O>(resourceUrl: string, requestBody: I, requestParams?: BasicRequestParams): Promise<O> {
    const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams), {
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
   * Hàm getWithToken
   * @param resourceUrl
   * @param requestParams
   * @param isAdmin
   */
  static async getWithToken<O>(resourceUrl: string, requestParams?: BasicRequestParams, isAdmin?: boolean): Promise<O> {
    const token = JSON.parse(localStorage
      .getItem(isAdmin ? 'electro-admin-auth-store' : 'electro-auth-store') || '{}').state?.jwtToken;

    // Source: https://stackoverflow.com/a/70426220
    const response = await fetch(FetchUtils.concatParams(resourceUrl, requestParams), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm postWithToken
   * @param resourceUrl
   * @param requestBody
   * @param isAdmin
   */
  static async postWithToken<I, O>(resourceUrl: string, requestBody: I, isAdmin?: boolean): Promise<O> {
    const token = JSON.parse(localStorage
      .getItem(isAdmin ? 'electro-admin-auth-store' : 'electro-auth-store') || '{}').state?.jwtToken;

    const response = await fetch(resourceUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm putWithToken
   * @param resourceUrl
   * @param requestBody
   * @param isAdmin
   */
  static async putWithToken<I, O>(resourceUrl: string, requestBody: I, isAdmin?: boolean): Promise<O> {
    const token = JSON.parse(localStorage
      .getItem(isAdmin ? 'electro-admin-auth-store' : 'electro-auth-store') || '{}').state?.jwtToken;

    const response = await fetch(resourceUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm deleteWithToken
   * @param resourceUrl
   * @param entityIds
   * @param isAdmin
   */
  static async deleteWithToken<T>(resourceUrl: string, entityIds: T[], isAdmin?: boolean) {
    const token = JSON.parse(localStorage
      .getItem(isAdmin ? 'electro-admin-auth-store' : 'electro-auth-store') || '{}').state?.jwtToken;

    const response = await fetch(resourceUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(entityIds),
    });

    if (!response.ok) {
      throw await response.json();
    }
  }

  /**
   * Hàm getAll dùng để lấy danh sách tất cả đối tượng (có thể theo một số tiêu chí, cài đặt trong requestParams)
   * @param resourceUrl
   * @param requestParams
   */
  static async getAll<O>(resourceUrl: string, requestParams?: RequestParams): Promise<ListResponse<O>> {
    const response = await fetch(FetchUtils.concatParams(resourceUrl, { ...requestParams }));
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
  static async deleteById<T>(resourceUrl: string, entityId: T) {
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
  static async deleteByIds<T>(resourceUrl: string, entityIds: T[]) {
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
   * Hàm uploadMultipleImages dùng để tải lên nhiều tệp hình
   * @param images
   */
  static async uploadMultipleImages(images: File[]): Promise<CollectionWrapper<UploadedImageResponse>> {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));

    const response = await fetch(ApplicationConstants.HOME_PATH + '/images/upload-multiple', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  }

  /**
   * Hàm concatParams dùng để nối url và requestParams
   * @param url
   * @param requestParams
   */
  private static concatParams = (url: string, requestParams?: BasicRequestParams) => {
    if (requestParams) {
      const filteredRequestParams = Object.fromEntries(Object.entries(requestParams)
        .filter(([, v]) => v != null && String(v).trim() !== '')) as Record<string, string>;
      if (Object.keys(filteredRequestParams).length === 0) {
        return url;
      }
      return url + '?' + new URLSearchParams(filteredRequestParams).toString();
    }
    return url;
  };
}

export default FetchUtils;
