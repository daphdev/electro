import ApplicationConstants from 'constants/ApplicationConstants';

const apiPath = ApplicationConstants.API_PATH;

class ResourceURL {
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

  static INVENTORY = apiPath + '/inventories';
  static WAREHOUSE = apiPath + '/warehouses';
  static PURCHASE_ORDER = apiPath + '/purchase-orders';
  static PURCHASE_ORDER_VARIANT = apiPath + '/purchase-order-variants';
  static DESTINATION = apiPath + '/destinations';
  static DOCKET = apiPath + '/dockets';
  static DOCKET_REASON = apiPath + '/docket-reasons';
  static COUNT = apiPath + '/counts';
  static TRANSFER = apiPath + '/transfers';

  static ORDER = apiPath + '/orders';
  static ORDER_RESOURCE = apiPath + '/order-resources';
  static ORDER_CANCELLATION_REASON = apiPath + '/order-cancellation-reasons';
}

export default ResourceURL;
