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
  '/user/wishlist': 'Sản phẩm yêu thích',
  '/user/preorder': 'Đặt trước sản phẩm',
  '/user/review': 'Đánh giá sản phẩm',
  '/user/notification': 'Thông báo',
  '/cart': 'Giỏ hàng',
  '/order': 'Đơn hàng',
  '/order/detail/:code': 'Chi tiết đơn hàng',
  '/user/chat': 'Yêu cầu tư vấn',
  '/payment/success': 'Thanh toán thành công',
  '/payment/cancel': 'Hủy thanh toán',
  '/user/reward': 'Điểm thưởng',
  '/signup': 'Đăng ký',
  '/forgot': 'Yêu cầu cấp lại mật khẩu',

  '/admin': 'Admin',
};

const handler = {
  get: function (target: typeof titles, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] + ' – Electro' : 'Electro';
  },
};

const Titles = new Proxy(titles, handler);

export default Titles;
