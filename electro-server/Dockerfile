# Sử dụng hình ảnh của OpenJDK có kích thước nhỏ hơn
FROM openjdk:11-jdk-slim

# Cài đặt các gói cần thiết cho MySQL và các gói phụ thuộc cho project Spring
RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat \
    && apt-get clean \
    && apt-get install -y locales \
    && locale-gen en_US.UTF-


# Đặt thư mục làm việc mặc định
WORKDIR /usr/src/myapp

# Sao chép các tệp lưu trữ của project Spring vào trong Dockerfile
COPY target/electro-0.0.1-SNAPSHOT.jar /usr/src/myapp/

# Mở cổng cho MySQL và Spring
EXPOSE 8085

ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

# Chạy ứng dụng Spring
CMD ["java", "-Dfile.encoding=UTF-8","-jar", "electro-0.0.1-SNAPSHOT.jar"]