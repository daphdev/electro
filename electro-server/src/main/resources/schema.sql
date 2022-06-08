USE electro;

-- DROP TABLES

DROP TABLE IF EXISTS province, district, address, user, role, user_role, brand;

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
