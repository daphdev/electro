
    drop table if exists prod.address;

    drop table if exists prod.district;

    drop table if exists prod.province;

    drop table if exists prod.role;

    drop table if exists prod.user;

    drop table if exists prod.user_role;

    create table prod.address (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        line varchar(255) not null,
        district_id bigint not null,
        province_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.district (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        name varchar(255) not null,
        province_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.province (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        name varchar(255) not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.role (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.user (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        avatar varchar(255),
        email varchar(255) not null,
        fullname varchar(255) not null,
        gender CHAR not null,
        password varchar(255) not null,
        phone varchar(255) not null,
        status TINYINT not null,
        username varchar(255) not null,
        address_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.user_role (
       user_id bigint not null,
        role_id bigint not null,
        primary key (user_id, role_id)
    ) engine=MyISAM;

    alter table prod.user 
       add constraint UK_dhlcfg8h1drrgu0irs1ro3ohb unique (address_id);

    alter table prod.address 
       add constraint FKqbjwfi50pdenou8j14knnffrh 
       foreign key (district_id) 
       references prod.district (id);

    alter table prod.address 
       add constraint FKf8x0jfwoo94op8u88og1ohdcn 
       foreign key (province_id) 
       references prod.province (id);

    alter table prod.district 
       add constraint FK276utu38g5lgqeth6pwfm3rw2 
       foreign key (province_id) 
       references prod.province (id);

    alter table prod.user 
       add constraint FKddefmvbrws3hvl5t0hnnsv8ox 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.user_role 
       add constraint FKa68196081fvovjhkek5m97n3y 
       foreign key (role_id) 
       references prod.role (id);

    alter table prod.user_role 
       add constraint FK859n2jvi8ivhui0rl0esws6o 
       foreign key (user_id) 
       references prod.user (id);
