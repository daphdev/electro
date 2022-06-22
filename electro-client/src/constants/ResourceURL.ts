const server = 'http://localhost:8085/api';

class ResourceURL {
  static ADDRESS = server + '/addresses';
  static PROVINCE = server + '/provinces';
  static DISTRICT = server + '/districts';

  static USER = server + '/users';
  static ROLE = server + '/roles';

  static EMPLOYEE = server + '/employees';
  static OFFICE = server + '/offices';
  static DEPARTMENT = server + '/departments';
  static JOB_TYPE = server + '/job-types';
  static JOB_LEVEL = server + '/job-levels';
  static JOB_TITLE = server + '/job-titles';

  static CUSTOMER = server + '/customers';
  static CUSTOMER_GROUP = server + '/customer-groups';
  static CUSTOMER_STATUS = server + '/customer-status';
  static CUSTOMER_RESOURCE = server + '/customer-resources';

  static CATEGORY = server + '/categories';
  static PRODUCT = server + '/products';
  static BRAND = server + '/brands';
  static SUPPLIER = server + '/suppliers';
  static UNIT = server + '/units';
  static TAG = server + '/tags';
  static GUARANTEE = server + '/guarantees';
  static PROPERTY = server + '/properties';
}

export default ResourceURL;
