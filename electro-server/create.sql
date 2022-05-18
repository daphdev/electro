
    create table address (
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

    create table district (
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

    create table province (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        name varchar(255) not null,
        primary key (id)
    ) engine=MyISAM;

    create table role (
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

    create table user (
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

    create table user_role (
       user_id bigint not null,
        role_id bigint not null,
        primary key (user_id, role_id)
    ) engine=MyISAM;

    alter table user 
       add constraint UK_dhlcfg8h1drrgu0irs1ro3ohb unique (address_id);

    alter table address 
       add constraint FKqbjwfi50pdenou8j14knnffrh 
       foreign key (district_id) 
       references district (id);

    alter table address 
       add constraint FKf8x0jfwoo94op8u88og1ohdcn 
       foreign key (province_id) 
       references province (id);

    alter table district 
       add constraint FK276utu38g5lgqeth6pwfm3rw2 
       foreign key (province_id) 
       references province (id);

    alter table user 
       add constraint FKddefmvbrws3hvl5t0hnnsv8ox 
       foreign key (address_id) 
       references address (id);

    alter table user_role 
       add constraint FKa68196081fvovjhkek5m97n3y 
       foreign key (role_id) 
       references role (id);

    alter table user_role 
       add constraint FK859n2jvi8ivhui0rl0esws6o 
       foreign key (user_id) 
       references user (id);
