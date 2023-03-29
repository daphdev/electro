# Giới thiệu

Công ty Electro là doanh nghiệp kinh doanh thiết bị điện tử. Hiện nay, công ty có nhu cầu mở rộng kênh bán hàng, hướng đến triển khai một website thương mại điện tử cho riêng công ty.

Nhằm đáp ứng nhu cầu của quý công ty, dự án Electro ra đời để xây dựng một website thương mại điện tử như ý định của quý công ty.

# Thiết kế hệ thống

## Actors

Hệ thống được thiết kế để phục vụ nhu cầu sử dụng của 3 actor chính: khách hàng (customer), người quản trị (admin) và nhân viên (employee). Trong đó, actor khách hàng có thể là một khách hàng vãng lai (anonymous customer), hoặc là một khách hàng đã đãng ký tài khoản trong hệ thống (registered customer).

Ngoài ra, hệ thống còn có sự tham gia của 2 actor phụ là dịch vụ của Giao Hàng Nhanh và PayPal để phục vụ các chức năng giao hàng và thanh toán.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60851390/228506277-f6f4311c-eb2a-4b8f-8d30-94b9c37b140e.png" alt="Actors" width="50%" />
  <br>
  <em>Actors</em>
</p>

## Use Case Diagram

Hệ thống được xây dựng để giải quyết nhu cầu bán hàng trực tuyến cho một công ty kinh doanh thiết bị điện tử, cũng như điều phối một số công việc nội bộ của công ty này.

Yêu cầu của công ty là phải có một website phía khách hàng để họ có thể tương tác với hệ thống, thực hiện những chức năng cơ bản của thương mại điện tử như thêm sản phẩm vào giỏ hàng, đăng ký tài khoản, cập nhật hồ sơ cá nhân, v.v.; đồng thời cũng phải có một website quản trị để điều phối hoạt động của công ty một cách toàn diện, từ việc quản lý nhân viên, khách hàng, đến quản lý sản phẩm, sự lưu thông hàng hóa ở kho bãi, đơn hàng, vận đơn, kiểm duyệt đánh giá, thiết lập các chương trình khuyến mãi, v.v.

<p align="center">
  <img src="https://user-images.githubusercontent.com/60851390/228513937-7f7c3233-ced4-4890-8a7c-b508321ac645.png" alt="Use Case Diagram" width="600" />
  <br>
  <em>Use Case Diagram</em>
</p>

## Class Diagram

Hệ thống gồm có 57 lớp chính, được chia thành 13 nhóm.

<p align="center" style="background-color: white;">
  <img src="https://user-images.githubusercontent.com/60851390/228512903-b45a45e3-7aa1-4a2b-911e-ad46a9ddb96e.svg" alt="Use Case Diagram" width="600" />
  <br>
  <em>Class Diagram</em>
</p>

| (1)                                                                                                                                                                 | (2)                                                                                                                                                                  | (3)                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/60851390/228515408-881b6843-c8c9-4d36-9529-3bd190df3ef0.png" alt="Class Diagram – Address" width="200" />       | <img src="https://user-images.githubusercontent.com/60851390/228516826-93987ca8-d10f-491e-89e2-7b798d135f11.png" alt="Class Diagram – Authentication" width="200" /> | <img src="https://user-images.githubusercontent.com/60851390/228517418-6153b5c1-f0df-4a21-9586-21393509cd34.png" alt="Class Diagram – Employee" width="200" /> |
| <img src="https://user-images.githubusercontent.com/60851390/228518663-2dce733e-139a-4c9e-9539-4d44e5734b84.png" alt="Class Diagram – Customer" width="200" />      | <img src="https://user-images.githubusercontent.com/60851390/228518924-89ad5ee8-30b9-43a7-8977-c586c43ac683.png" alt="Class Diagram – Product" width="200" />        | <img src="https://user-images.githubusercontent.com/60851390/228519176-fabe9c8d-fd5d-4753-a692-a7b75101ddb8.png" alt="Class Diagram – Cart" width="200" />     |
| <img src="https://user-images.githubusercontent.com/60851390/228520390-b7e837c2-420f-4e6f-9b01-8763bb927739.png" alt="Class Diagram – Order" width="200" />         | <img src="https://user-images.githubusercontent.com/60851390/228520433-35ad0c15-3b54-4c29-8daf-95dfbf9607ff.png" alt="Class Diagram – Waybill" width="200" />        | <img src="https://user-images.githubusercontent.com/60851390/228520466-c232f7de-101e-4148-89c2-c1f12c2bda6b.png" alt="Class Diagram – Reward" width="200" />   |
| <img src="https://user-images.githubusercontent.com/60851390/228522640-c5d82529-4e4e-4395-9348-cfea8c71972e.png" alt="Class Diagram – Chat" width="200" />          | <img src="https://user-images.githubusercontent.com/60851390/228521635-25c68b9e-73f4-4e19-a7a6-380e442dbf6b.png" alt="Class Diagram – Inventory" width="200" />      | <img src="https://user-images.githubusercontent.com/60851390/228521672-00401e43-d933-48f9-8099-d3a23f95d22a.png" alt="Class Diagram – Cashbook" width="200" /> |
| <img src="https://user-images.githubusercontent.com/60851390/228521708-2e841fff-5553-405a-a5cd-eb3d827ecef3.png" alt="Class Diagram – Miscellaneous" width="200" /> |

## Database Diagram

Cơ sở dữ liệu của hệ thống gồm có 60 bảng.

<p align="center" style="background-color: white;">
  <img src="https://user-images.githubusercontent.com/60851390/228530802-146787fa-8d88-42e0-b95e-3452ddb1b40e.svg" alt="Database Diagram" />
  <br>
  <em>Database Diagram</em>
</p>

## Kiến trúc tổng thể hệ thống

Hệ thống được thiết kế theo kiến trúc 3 tầng, trong đó: tầng dữ liệu được quản lý bởi hệ quản trị cơ sở dữ liệu MySQL, tầng ứng dụng là một ứng dụng Spring Boot, và tầng trình bày là một ứng dụng React.

Tầng ứng dụng kết nối với tầng dữ liệu bằng kết nối TCP, và việc kết nối được quản lý bởi JDBC. Tại tầng ứng dụng, việc thao tác với dữ liệu được thực hiện thông qua framework Spring Data JPA.

Tầng ứng dụng kết nối với tầng trình bày bằng kết nối HTTP (RESTful API) và WebSocket để gửi các dữ liệu cũng như nhận các lệnh thay đổi dữ liệu từ người dùng.

Ứng dụng Spring Boot của tầng ứng dụng được tổ chức theo kiến trúc MVC. Vì hệ thống được thiết kế theo hướng SPA, nên phần view của ứng dụng Spring Boot chỉ là các tệp JSON đơn giản hoặc trạng trái HTTP trong response. Phần model được cụ thể hóa bằng các đối tượng entity (thực thể đại diện cho một bảng dữ liệu), repository (đối tượng thao tác với cơ sở dữ liệu) và service (triển khai các hành vi nghiệp vụ). Phần controller đảm nhận định tuyến các lời gọi API đến các phương thức xử lý được chỉ định, từ đó gọi service để thực hiện yêu cầu.

Toàn bộ hệ thống được triển khai trên nền tảng Docker, gồm có 3 container tương ứng với mỗi tầng. Một container cho cơ sở dữ liệu MySQL, một container cho ứng dụng Spring Boot, và một container cho ứng dụng React. Các container giao tiếp với nhau bằng một mạng nội bộ do Docker quản lý thông qua cấu hình cho trước.

Ngoài ra, hệ thống còn tương tác với các dịch vụ bên thứ ba, bao gồm dịch vụ vận chuyển Giao Hàng Nhanh và dịch vụ thanh toán quốc tế PayPal.

<p align="center" style="background-color: white;">
  <img src="https://user-images.githubusercontent.com/60851390/228531433-ba3a591b-7b9b-4e51-bfae-4ea0cdfe3c5a.svg" alt="Database Diagram" width="700" />
  <br>
  <em>System Architecture</em>
</p>
