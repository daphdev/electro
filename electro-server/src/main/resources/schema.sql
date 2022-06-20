USE electro;

-- DROP TABLES

DROP TABLE IF EXISTS
    province,
    district,
    address,
    user,
    role,
    user_role,
    brand,
    office,
    department,
    job_level,
    job_title,
    job_type,
    employee,
    customer_group,
    customer_resource,
    customer_status,
    customer,
    property,
    category,
    category_property,
    tag,
    image,
    guarantee,
    unit,
    supplier,
    product;

-- CREATE TABLES

CREATE TABLE province
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime              NOT NULL,
    updated_at datetime              NOT NULL,
    created_by BIGINT                NULL,
    updated_by BIGINT                NULL,
    name       VARCHAR(255)          NOT NULL,
    code       VARCHAR(35)           NOT NULL,
    CONSTRAINT pk_province PRIMARY KEY (id)
);

CREATE TABLE district
(
    id          BIGINT AUTO_INCREMENT NOT NULL,
    created_at  datetime              NOT NULL,
    updated_at  datetime              NOT NULL,
    created_by  BIGINT                NULL,
    updated_by  BIGINT                NULL,
    name        VARCHAR(255)          NOT NULL,
    code        VARCHAR(35)           NOT NULL,
    province_id BIGINT                NOT NULL,
    CONSTRAINT pk_district PRIMARY KEY (id)
);

ALTER TABLE district
    ADD CONSTRAINT FK_DISTRICT_ON_PROVINCE FOREIGN KEY (province_id) REFERENCES province (id);

CREATE TABLE address
(
    id          BIGINT AUTO_INCREMENT NOT NULL,
    created_at  datetime              NOT NULL,
    updated_at  datetime              NOT NULL,
    created_by  BIGINT                NULL,
    updated_by  BIGINT                NULL,
    line        VARCHAR(255)          NOT NULL,
    province_id BIGINT                NOT NULL,
    district_id BIGINT                NOT NULL,
    CONSTRAINT pk_address PRIMARY KEY (id)
);

ALTER TABLE address
    ADD CONSTRAINT FK_ADDRESS_ON_DISTRICT FOREIGN KEY (district_id) REFERENCES district (id);

ALTER TABLE address
    ADD CONSTRAINT FK_ADDRESS_ON_PROVINCE FOREIGN KEY (province_id) REFERENCES province (id);

CREATE TABLE user
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime              NOT NULL,
    updated_at datetime              NOT NULL,
    created_by BIGINT                NULL,
    updated_by BIGINT                NULL,
    username   VARCHAR(255)          NOT NULL,
    password   VARCHAR(255)          NOT NULL,
    fullname   VARCHAR(255)          NOT NULL,
    email      VARCHAR(255)          NOT NULL,
    phone      VARCHAR(255)          NOT NULL,
    gender     CHAR                  NOT NULL,
    address_id BIGINT                NOT NULL,
    avatar     VARCHAR(255)          NULL,
    status     TINYINT               NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

ALTER TABLE user
    ADD CONSTRAINT uc_user_address UNIQUE (address_id);

ALTER TABLE user
    ADD CONSTRAINT FK_USER_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);

CREATE TABLE `role`
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime              NOT NULL,
    updated_at datetime              NOT NULL,
    created_by BIGINT                NULL,
    updated_by BIGINT                NULL,
    code       VARCHAR(35)           NOT NULL,
    name       VARCHAR(255)          NOT NULL,
    status     TINYINT               NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY (id)
);

CREATE TABLE user_role
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id)
);

ALTER TABLE user_role
    ADD CONSTRAINT FK_USER_ROLE_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE user_role
    ADD CONSTRAINT FK_USER_ROLE_ON_ROLE FOREIGN KEY (role_id) REFERENCES role (id);

CREATE TABLE brand
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    created_at    datetime              NOT NULL,
    updated_at    datetime              NOT NULL,
    created_by    BIGINT                NULL,
    updated_by    BIGINT                NULL,
    name          VARCHAR(255)          NOT NULL,
    code          VARCHAR(35)           NOT NULL,
    `description` VARCHAR(255)          NOT NULL,
    status        TINYINT               NOT NULL,
    CONSTRAINT pk_brand PRIMARY KEY (id)
);

CREATE TABLE office (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   address_id BIGINT NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_office PRIMARY KEY (id)
);

ALTER TABLE office ADD CONSTRAINT uc_office_address UNIQUE (address_id);

ALTER TABLE office ADD CONSTRAINT FK_OFFICE_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);

CREATE TABLE department (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_department PRIMARY KEY (id)
);

CREATE TABLE job_level (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_job_lever PRIMARY KEY (id)
);

CREATE TABLE job_title (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_job_title PRIMARY KEY (id)
);

CREATE TABLE job_type (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_job_type PRIMARY KEY (id)
);

CREATE TABLE employee (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   user_id BIGINT NOT NULL,
   office_id BIGINT NOT NULL,
   department_id BIGINT NOT NULL,
   job_type_id BIGINT NOT NULL,
   job_level_id BIGINT NOT NULL,
   job_title_id BIGINT NOT NULL,
   CONSTRAINT pk_employee PRIMARY KEY (id)
);

ALTER TABLE employee ADD CONSTRAINT uc_employee_user UNIQUE (user_id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_DEPARTMENT FOREIGN KEY (department_id) REFERENCES department (id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_JOB_LEVEL FOREIGN KEY (job_level_id) REFERENCES job_level (id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_JOB_TITLE FOREIGN KEY (job_title_id) REFERENCES job_title (id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_JOB_TYPE FOREIGN KEY (job_type_id) REFERENCES job_type (id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_OFFICE FOREIGN KEY (office_id) REFERENCES office (id);

ALTER TABLE employee ADD CONSTRAINT FK_EMPLOYEE_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

CREATE TABLE `customer_group` (
    id BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    created_by BIGINT NULL,
    updated_by BIGINT NULL,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL,
    CONSTRAINT `pk_customer-group` PRIMARY KEY (id)
);

CREATE TABLE `customer_resource` (
    id BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    created_by BIGINT NULL,
    updated_by BIGINT NULL,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL,
    CONSTRAINT `pk_customer-resource` PRIMARY KEY (id)
);

CREATE TABLE `customer_status` (
    id BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    created_by BIGINT NULL,
    updated_by BIGINT NULL,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL,
    CONSTRAINT `pk_customer-status` PRIMARY KEY (id)
);

CREATE TABLE customer (
    id BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    created_by BIGINT NULL,
    updated_by BIGINT NULL,
    user_id BIGINT NOT NULL,
    customer_group_id BIGINT NOT NULL,
    customer_resource_id BIGINT NOT NULL,
    customer_status_id BIGINT NOT NULL,
    CONSTRAINT pk_customer PRIMARY KEY (id)
);

ALTER TABLE customer ADD CONSTRAINT uc_customer_user UNIQUE (user_id);

ALTER TABLE customer ADD CONSTRAINT FK_CUSTOMER_ON_CUSTOMER_GROUP FOREIGN KEY (customer_group_id) REFERENCES customer_group (id);

ALTER TABLE customer ADD CONSTRAINT FK_CUSTOMER_ON_CUSTOMER_RESOURCE FOREIGN KEY (customer_resource_id) REFERENCES customer_resource (id);

ALTER TABLE customer ADD CONSTRAINT FK_CUSTOMER_ON_CUSTOMER_STATUS FOREIGN KEY (customer_status_id) REFERENCES customer_status (id);

ALTER TABLE customer ADD CONSTRAINT FK_CUSTOMER_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

CREATE TABLE property (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   code VARCHAR(255) NOT NULL,
   type VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_property PRIMARY KEY (id)
);

CREATE TABLE category (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   thumbnail VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   category_id BIGINT NULL,
   CONSTRAINT pk_category PRIMARY KEY (id)
);

ALTER TABLE category ADD CONSTRAINT FK_CATEGORY_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

CREATE TABLE category_property
(
    category_id bigint not null,
    property_id bigint not null,
    primary key (category_id, property_id)
);

ALTER TABLE category_property
    ADD CONSTRAINT FK_CATEGORY_PROPERTY_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

ALTER TABLE category_property
    ADD CONSTRAINT FK_CATEGORY_PROPERTY_ON_PROPERTY FOREIGN KEY (property_id) REFERENCES property (id);

CREATE TABLE tag (
  id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_tag PRIMARY KEY (id)
);

CREATE TABLE image (
  id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   CONSTRAINT pk_image PRIMARY KEY (id)
);

CREATE TABLE guarantee (
  id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_guarantee PRIMARY KEY (id)
);

CREATE TABLE unit (
  id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_unit PRIMARY KEY (id)
);

CREATE TABLE supplier (
  id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   display_name VARCHAR(255) NOT NULL,
   code VARCHAR(255) NOT NULL,
   contact_fullname VARCHAR(255) NOT NULL,
   contact_email VARCHAR(255) NOT NULL,
   company_name VARCHAR(255) NOT NULL,
   tax_code VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   phone VARCHAR(255) NOT NULL,
   fax VARCHAR(255) NOT NULL,
   website VARCHAR(255) NULL,
   address_id BIGINT NOT NULL,
   `description` VARCHAR(255) NULL,
   note VARCHAR(255) NULL,
   status TINYINT NOT NULL,
   CONSTRAINT pk_supplier PRIMARY KEY (id)
);

ALTER TABLE supplier ADD CONSTRAINT uc_supplier_address UNIQUE (address_id);

ALTER TABLE supplier ADD CONSTRAINT FK_SUPPLIER_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);

CREATE TABLE product (
   id BIGINT AUTO_INCREMENT NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   created_by BIGINT NULL,
   updated_by BIGINT NULL,
   name VARCHAR(255) NOT NULL,
   code VARCHAR(255) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   thumbnail VARCHAR(255) NOT NULL,
   status TINYINT NOT NULL,
   properties json NOT NULL,
   CONSTRAINT pk_product PRIMARY KEY (id)
);
