
    drop table if exists prod.address;

    drop table if exists prod.brand;

    drop table if exists prod.category;

    drop table if exists prod.category_property;

    drop table if exists prod.customer;

    drop table if exists prod.customer_group;

    drop table if exists prod.customer_resource;

    drop table if exists prod.customer_status;

    drop table if exists prod.department;

    drop table if exists prod.district;

    drop table if exists prod.employee;

    drop table if exists prod.guarantee;

    drop table if exists prod.image;

    drop table if exists prod.job_level;

    drop table if exists prod.job_title;

    drop table if exists prod.job_type;

    drop table if exists prod.office;

    drop table if exists prod.product;

    drop table if exists prod.product_inventory_limit;

    drop table if exists prod.property;

    drop table if exists prod.province;

    drop table if exists prod.role;

    drop table if exists prod.supplier;

    drop table if exists prod.tag;

    drop table if exists prod.unit;

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

    create table prod.brand (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.category (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        thumbnail varchar(255) not null,
        category_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.category_property (
       category_id bigint not null,
        property_id bigint not null,
        primary key (category_id, property_id)
    ) engine=MyISAM;

    create table prod.customer (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        customer_group_id bigint not null,
        customer_resource_id bigint not null,
        customer_status_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.customer_group (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        color varchar(255) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.customer_resource (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        color varchar(255) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.customer_status (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        color varchar(255) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.department (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
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

    create table prod.employee (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        department_id bigint not null,
        job_level_id bigint not null,
        job_title_id bigint not null,
        job_type_id bigint not null,
        office_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.guarantee (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.image (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        product_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.job_level (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.job_title (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.job_type (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.office (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        address_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.product (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        properties JSON,
        status TINYINT not null,
        thumbnail varchar(255) not null,
        brand_id bigint,
        category_id bigint,
        guarantee_id bigint,
        supplier_id bigint,
        unit_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.product_inventory_limit (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        maximum_limit integer,
        minimum_limit integer,
        product_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.property (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        description varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        type varchar(255) not null,
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

    create table prod.supplier (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        company_name varchar(255) not null,
        contact_email varchar(255) not null,
        contact_fullname varchar(255) not null,
        contact_phone varchar(255) not null,
        description varchar(255),
        display_name varchar(255) not null,
        email varchar(255) not null,
        fax varchar(255) not null,
        note varchar(255),
        phone varchar(255) not null,
        status TINYINT not null,
        tax_code varchar(255) not null,
        website varchar(255),
        address_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.tag (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.unit (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
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

    alter table prod.customer 
       add constraint UK_j7ja2xvrxudhvssosd4nu1o92 unique (user_id);

    alter table prod.employee 
       add constraint UK_mpps3d3r9pdvyjx3iqixi96fi unique (user_id);

    alter table prod.office 
       add constraint UK_mlsa2m6po5222mgtojis7rnow unique (address_id);

    alter table prod.product_inventory_limit 
       add constraint UK_b2qaaqlye3no6xy07jm62qetq unique (product_id);

    alter table prod.supplier 
       add constraint UK_78419iap4p0q918rhlcr1phkl unique (address_id);

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

    alter table prod.category 
       add constraint FKap0cnk1255oj4bwam7in1hxxv 
       foreign key (category_id) 
       references prod.category (id);

    alter table prod.category_property 
       add constraint FKdpu5w0d2yxl44p7w5b9qthbw4 
       foreign key (property_id) 
       references prod.property (id);

    alter table prod.category_property 
       add constraint FKcyg1h6ev059nd3cjg6x9xwaeh 
       foreign key (category_id) 
       references prod.category (id);

    alter table prod.customer 
       add constraint FK9ogndo8hll7edx5iloyu2uegy 
       foreign key (customer_group_id) 
       references prod.customer_group (id);

    alter table prod.customer 
       add constraint FKp8952xfwntg9alu1r6b4vhsuj 
       foreign key (customer_resource_id) 
       references prod.customer_resource (id);

    alter table prod.customer 
       add constraint FK2r41502dbwehta0hpw1h1iml0 
       foreign key (customer_status_id) 
       references prod.customer_status (id);

    alter table prod.customer 
       add constraint FKj8dlm21j202cadsbfkoem0s58 
       foreign key (user_id) 
       references prod.user (id);

    alter table prod.district 
       add constraint FK276utu38g5lgqeth6pwfm3rw2 
       foreign key (province_id) 
       references prod.province (id);

    alter table prod.employee 
       add constraint FKbejtwvg9bxus2mffsm3swj3u9 
       foreign key (department_id) 
       references prod.department (id);

    alter table prod.employee 
       add constraint FKor1u9v6xi7l1pocx10h0hqier 
       foreign key (job_level_id) 
       references prod.job_level (id);

    alter table prod.employee 
       add constraint FKp3gjxglyx92kclcf5u6gwpt8v 
       foreign key (job_title_id) 
       references prod.job_title (id);

    alter table prod.employee 
       add constraint FKp0ih3swro21lfpnk4fcdob6lk 
       foreign key (job_type_id) 
       references prod.job_type (id);

    alter table prod.employee 
       add constraint FKjurhambl7fs34cp8i36xpd5yp 
       foreign key (office_id) 
       references prod.office (id);

    alter table prod.employee 
       add constraint FK6lk0xml9r7okjdq0onka4ytju 
       foreign key (user_id) 
       references prod.user (id);

    alter table prod.image 
       add constraint FKgpextbyee3uk9u6o2381m7ft1 
       foreign key (product_id) 
       references prod.product (id);

    alter table prod.office 
       add constraint FKak81m3gkj8xq5t48xuflbj0kn 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.product 
       add constraint FKs6cydsualtsrprvlf2bb3lcam 
       foreign key (brand_id) 
       references prod.brand (id);

    alter table prod.product 
       add constraint FK1mtsbur82frn64de7balymq9s 
       foreign key (category_id) 
       references prod.category (id);

    alter table prod.product 
       add constraint FKgfhdydadolarv86kxk0my2uj3 
       foreign key (guarantee_id) 
       references prod.guarantee (id);

    alter table prod.product 
       add constraint FK2kxvbr72tmtscjvyp9yqb12by 
       foreign key (supplier_id) 
       references prod.supplier (id);

    alter table prod.product 
       add constraint FKndrubbm6whifirg6o2bpdcf6b 
       foreign key (unit_id) 
       references prod.unit (id);

    alter table prod.product_inventory_limit 
       add constraint FKgty8thbjnwann6fcm9q5gibvx 
       foreign key (product_id) 
       references prod.product (id);

    alter table prod.supplier 
       add constraint FK95a8oipih48obtbhltjy7hgvb 
       foreign key (address_id) 
       references prod.address (id);

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
