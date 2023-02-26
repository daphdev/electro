# Sử dụng image của OpenJDK có kích thước nhỏ hơn
FROM openjdk:11-jdk-slim

# Cài đặt các gói cần thiết cho MySQL và các gói phụ thuộc cho project Spring
RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat \
    && apt-get clean \
    && apt-get install -y locales \
    && locale-gen C.UTF-8

# Đặt thư mục làm việc mặc định
WORKDIR /electro-server

# Sao chép các tệp lưu trữ của project Spring vào trong Dockerfile
COPY target/electro-0.0.1-SNAPSHOT.jar /electro-server

# Mở cổng cho MySQL và Spring
EXPOSE 8085

# Đặt định dạng mã hóa Unicode
ENV LANG = C.UTF-8
ENV LC_ALL C.UTF-8

# Chạy ứng dụng Spring
CMD ["java", "-jar", "electro-0.0.1-SNAPSHOT.jar"]
