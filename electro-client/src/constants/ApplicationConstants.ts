class ApplicationConstants {
  static HOME_PATH = 'http://localhost:8085';
  static API_PATH = ApplicationConstants.HOME_PATH + '/api';
  static CLIENT_API_PATH = ApplicationConstants.HOME_PATH + '/client-api';
  static WEBSOCKET_PATH = ApplicationConstants.HOME_PATH + '/ws';

  static DEFAULT_TAX = 0.1;
  static DEFAULT_SHIPPING_COST = 0;

  static DEFAULT_CLIENT_CATEGORY_PAGE_SIZE = 9;
  static DEFAULT_CLIENT_SEARCH_PAGE_SIZE = 12;
  static DEFAULT_CLIENT_WISHLIST_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_PREORDER_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_USER_REVIEW_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_PRODUCT_REVIEW_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_NOTIFICATION_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_ORDER_PAGE_SIZE = 5;
}

export default ApplicationConstants;
