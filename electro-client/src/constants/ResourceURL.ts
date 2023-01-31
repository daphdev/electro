import ApplicationConstants from 'constants/ApplicationConstants';

const apiPath = ApplicationConstants.API_PATH;
const clientApiPath = ApplicationConstants.CLIENT_API_PATH;

class ResourceURL {
  // ADMIN
  static ADDRESS = apiPath + '/addresses';
  static PROVINCE = apiPath + '/provinces';
  static DISTRICT = apiPath + '/districts';

  static USER = apiPath + '/users';
  static ROLE = apiPath + '/roles';

  static EMPLOYEE = apiPath + '/employees';
  static OFFICE = apiPath + '/offices';
  static DEPARTMENT = apiPath + '/departments';
  static JOB_TYPE = apiPath + '/job-types';
  static JOB_LEVEL = apiPath + '/job-levels';
  static JOB_TITLE = apiPath + '/job-titles';

  static CUSTOMER = apiPath + '/customers';
  static CUSTOMER_GROUP = apiPath + '/customer-groups';
  static CUSTOMER_STATUS = apiPath + '/customer-status';
  static CUSTOMER_RESOURCE = apiPath + '/customer-resources';

  static PRODUCT = apiPath + '/products';
  static CATEGORY = apiPath + '/categories';
  static BRAND = apiPath + '/brands';
  static SUPPLIER = apiPath + '/suppliers';
  static UNIT = apiPath + '/units';
  static TAG = apiPath + '/tags';
  static GUARANTEE = apiPath + '/guarantees';
  static PROPERTY = apiPath + '/properties';
  static SPECIFICATION = apiPath + '/specifications';
  static VARIANT = apiPath + '/variants';

  static PRODUCT_INVENTORY = apiPath + '/product-inventories';
  static VARIANT_INVENTORY = apiPath + '/variant-inventories';
  static WAREHOUSE = apiPath + '/warehouses';
  static PURCHASE_ORDER = apiPath + '/purchase-orders';
  static PURCHASE_ORDER_VARIANT = apiPath + '/purchase-order-variants';
  static DESTINATION = apiPath + '/destinations';
  static DOCKET = apiPath + '/dockets';
  static DOCKET_VARIANT = apiPath + '/docket-variants';
  static DOCKET_REASON = apiPath + '/docket-reasons';
  static COUNT = apiPath + '/counts';
  static COUNT_VARIANT = apiPath + '/count-variants';
  static TRANSFER = apiPath + '/transfers';
  static TRANSFER_VARIANT = apiPath + '/transfer-variants';

  static ORDER = apiPath + '/orders';
  static ORDER_VARIANT = apiPath + '/order-variants';
  static ORDER_RESOURCE = apiPath + '/order-resources';
  static ORDER_CANCELLATION_REASON = apiPath + '/order-cancellation-reasons';

  // CLIENT
  static CLIENT_CATEGORY = clientApiPath + '/categories';
  static CLIENT_PRODUCT = clientApiPath + '/products';
  static CLIENT_FILTER_CATEGORY = clientApiPath + '/filters/category';
  static CLIENT_FILTER_SEARCH = clientApiPath + '/filters/search';
  static CLIENT_USER_INFO = clientApiPath + '/users/info';
  static CLIENT_USER_PERSONAL_SETTING = clientApiPath + '/users/personal';
  static CLIENT_USER_PHONE_SETTING = clientApiPath + '/users/phone';
  static CLIENT_USER_EMAIL_SETTING = clientApiPath + '/users/email';
  static CLIENT_USER_PASSWORD_SETTING = clientApiPath + '/users/password';
  static CLIENT_WISH = clientApiPath + '/wishes';
  static CLIENT_PREORDER = clientApiPath + '/preorders';
  static CLIENT_REVIEW = clientApiPath + '/reviews';

  // AUTHENTICATION
  static LOGIN = apiPath + '/auth/login';
}

export default ResourceURL;
