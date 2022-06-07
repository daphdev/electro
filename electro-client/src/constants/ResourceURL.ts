const server = 'http://localhost:8085/api';

class ResourceURL {
  static ADDRESS = server + 'addresses';
  static PROVINCE = server + '/provinces';
  static DISTRICT = server + '/districts';
}

export default ResourceURL;
