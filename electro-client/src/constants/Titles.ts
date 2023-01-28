const titles: Record<string, string> = {
  '/': 'Trang chủ',
  '/all-categories': 'Tất cả danh mục sản phẩm',
  '/category/:slug': 'Thể loại',
  '/signin': 'Đăng nhập',
  '/user': 'Tài khoản',
  '/user/setting': 'Thiết đặt',
  '/user/setting/personal': 'Cập nhật thông tin cá nhân',
  '/user/setting/phone': 'Cập nhật số điện thoại',
  '/user/setting/email': 'Cập nhật email',
  '/user/setting/password': 'Đổi mật khẩu',

  '/admin': 'Admin',
};

const handler = {
  get: function (target: typeof titles, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] + ' – Electro' : 'Electro';
  },
};

const Titles = new Proxy(titles, handler);

export default Titles;
