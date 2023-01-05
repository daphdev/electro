const titles: Record<string, string> = {
  '/': 'Trang chủ',
  '/all-categories': 'Tất cả danh mục sản phẩm',
  '/category/:slug': 'Thể loại',

  '/admin': 'Admin',
};

const handler = {
  get: function (target: typeof titles, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] + ' – Electro' : 'Electro';
  },
};

const Titles = new Proxy(titles, handler);

export default Titles;
