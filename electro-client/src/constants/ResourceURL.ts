const server = 'http://localhost:8085/api';

class ResourceURL {
  static ADDRESS = server + '/addresses';
  static PROVINCE = server + '/provinces';
  static DISTRICT = server + '/districts';
  static USER = server + '/users';
  static ROLE = server + '/roles';
}

export default ResourceURL;
