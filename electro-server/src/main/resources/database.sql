
    drop table if exists prod.address;

    drop table if exists prod.brand;

    drop table if exists prod.cart;

    drop table if exists prod.cart_variant;

    drop table if exists prod.category;

    drop table if exists prod.count;

    drop table if exists prod.count_variant;

    drop table if exists prod.customer;

    drop table if exists prod.customer_group;

    drop table if exists prod.customer_resource;

    drop table if exists prod.customer_status;

    drop table if exists prod.department;

    drop table if exists prod.destination;

    drop table if exists prod.district;

    drop table if exists prod.docket;

    drop table if exists prod.docket_reason;

    drop table if exists prod.docket_variant;

    drop table if exists prod.employee;

    drop table if exists prod.guarantee;

    drop table if exists prod.image;

    drop table if exists prod.job_level;

    drop table if exists prod.job_title;

    drop table if exists prod.job_type;

    drop table if exists prod.notification;

    drop table if exists prod.office;

    drop table if exists prod.`order`;

    drop table if exists prod.order_cancellation_reason;

    drop table if exists prod.order_resource;

    drop table if exists prod.order_variant;

    drop table if exists prod.preorder;

    drop table if exists prod.product;

    drop table if exists prod.product_inventory_limit;

    drop table if exists prod.product_tag;

    drop table if exists prod.property;

    drop table if exists prod.province;

    drop table if exists prod.purchase_order;

    drop table if exists prod.purchase_order_variant;

    drop table if exists prod.review;

    drop table if exists prod.role;

    drop table if exists prod.specification;

    drop table if exists prod.storage_location;

    drop table if exists prod.supplier;

    drop table if exists prod.tag;

    drop table if exists prod.transfer;

    drop table if exists prod.unit;

    drop table if exists prod.user;

    drop table if exists prod.user_role;

    drop table if exists prod.variant;

    drop table if exists prod.variant_inventory_limit;

    drop table if exists prod.ward;

    drop table if exists prod.warehouse;

    drop table if exists prod.wish;

    drop table if exists prod.waybill;

    create table prod.address (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        line varchar(255),
        district_id bigint,
        province_id bigint,
        ward_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.brand (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        description varchar(255),
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.cart (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        status TINYINT not null,
        user_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.cart_variant (
       cart_id bigint not null,
        variant_id bigint not null,
        created_at datetime not null,
        quantity integer not null,
        primary key (cart_id, variant_id)
    ) engine=MyISAM;

    create table prod.category (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        description varchar(255),
        name varchar(255) not null,
        slug varchar(255) not null,
        status TINYINT not null,
        thumbnail varchar(255),
        category_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.count (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        note varchar(255),
        status TINYINT not null,
        warehouse_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.count_variant (
       count_id bigint not null,
        variant_id bigint not null,
        actual_inventory integer not null,
        inventory integer not null,
        primary key (count_id, variant_id)
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

    create table prod.destination (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        contact_email varchar(255),
        contact_fullname varchar(255),
        contact_phone varchar(255),
        status TINYINT not null,
        address_id bigint not null,
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

    create table prod.docket (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        note varchar(255),
        status TINYINT not null,
        type integer not null,
        order_id bigint,
        purchase_order_id bigint,
        reason_id bigint not null,
        warehouse_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.docket_reason (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.docket_variant (
       docket_id bigint not null,
        variant_id bigint not null,
        quantity integer not null,
        primary key (docket_id, variant_id)
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
        description varchar(255),
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
        content_type varchar(255) not null,
        `group` varchar(255) not null,
        is_eliminated BOOLEAN not null,
        is_thumbnail BOOLEAN not null,
        name varchar(255) not null,
        path varchar(255) not null,
        size bigint not null,
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

    create table prod.notification (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        anchor varchar(255),
        message varchar(255) not null,
        status TINYINT not null,
        type varchar(255) not null,
        user_id bigint not null,
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

    create table prod.`order` (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        note varchar(255),
        shipping_cost DECIMAL(15,5) not null,
        status TINYINT not null,
        tax DECIMAL(15,5) not null,
        to_address varchar(255) not null,
        to_district_name varchar(255) not null,
        to_name varchar(255) not null,
        to_phone varchar(255) not null,
        to_province_name varchar(255) not null,
        to_ward_name varchar(255) not null,
        total_amount DECIMAL(15,5) not null,
        total_pay DECIMAL(15,5) not null,
        customer_id bigint not null,
        order_cancellation_reason_id bigint,
        order_resource_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.order_cancellation_reason (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        note varchar(255),
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.order_resource (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        color varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        customer_resource_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.order_variant (
       order_id bigint not null,
        variant_id bigint not null,
        amount DECIMAL(15,5) not null,
        price DECIMAL(15,5) not null,
        quantity integer not null,
        primary key (order_id, variant_id)
    ) engine=MyISAM;

    create table prod.preorder (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        status TINYINT not null,
        product_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.product (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        description varchar(255),
        name varchar(255) not null,
        properties JSON,
        short_description varchar(255),
        slug varchar(255) not null,
        specifications JSON,
        status TINYINT not null,
        weight double precision,
        brand_id bigint,
        category_id bigint,
        guarantee_id bigint,
        supplier_id bigint,
        unit_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.product_inventory_limit (
       product_id bigint not null,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        maximum_limit integer,
        minimum_limit integer,
        primary key (product_id)
    ) engine=MyISAM;

    create table prod.product_tag (
       product_id bigint not null,
        tag_id bigint not null,
        primary key (product_id, tag_id)
    ) engine=MyISAM;

    create table prod.property (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        description varchar(255),
        name varchar(255) not null,
        status TINYINT not null,
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

    create table prod.purchase_order (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        note varchar(255),
        status TINYINT not null,
        total_amount double precision not null,
        destination_id bigint not null,
        supplier_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.purchase_order_variant (
       purchase_order_id bigint not null,
        variant_id bigint not null,
        amount double precision not null,
        cost double precision not null,
        quantity integer not null,
        primary key (purchase_order_id, variant_id)
    ) engine=MyISAM;

    create table prod.review (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        content TEXT not null,
        rating_score TINYINT not null,
        reply TEXT,
        status TINYINT not null,
        product_id bigint not null,
        user_id bigint not null,
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

    create table prod.specification (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        description varchar(255),
        name varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.storage_location (
       variant_id bigint not null,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        warehouse_id bigint not null,
        primary key (variant_id)
    ) engine=MyISAM;

    create table prod.supplier (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        company_name varchar(255),
        contact_email varchar(255),
        contact_fullname varchar(255),
        contact_phone varchar(255),
        description varchar(255),
        display_name varchar(255) not null,
        email varchar(255),
        fax varchar(255),
        note varchar(255),
        phone varchar(255),
        status TINYINT not null,
        tax_code varchar(255),
        website varchar(255),
        address_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.tag (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        name varchar(255) not null,
        slug varchar(255) not null,
        status TINYINT not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.transfer (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        note varchar(255),
        export_docket_id bigint not null,
        import_docket_id bigint not null,
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

    create table prod.variant (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        cost double precision not null,
        images JSON,
        price double precision not null,
        properties JSON,
        sku varchar(255) not null,
        status TINYINT not null,
        product_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.variant_inventory_limit (
       variant_id bigint not null,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        maximum_limit integer,
        minimum_limit integer,
        primary key (variant_id)
    ) engine=MyISAM;

    create table prod.ward (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(35) not null,
        name varchar(255) not null,
        district_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.warehouse (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        code varchar(255) not null,
        name varchar(255) not null,
        status TINYINT not null,
        address_id bigint,
        primary key (id)
    ) engine=MyISAM;

    create table prod.wish (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        product_id bigint not null,
        user_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    create table prod.waybill (
       id bigint not null auto_increment,
        created_at datetime not null,
        created_by bigint,
        updated_at datetime not null,
        updated_by bigint,
        cod_amount integer not null,
        code varchar(255) not null,
        expected_delivery_time datetime,
        height integer not null,
        length integer not null,
        note varchar(255),
        payment_type_id integer,
        receipt_date datetime,
        required_note varchar(255),
        service_id integer not null,
        service_type_id integer not null,
        shipping_date datetime not null,
        status TINYINT not null,
        weight integer not null,
        width integer not null,
        order_id bigint not null,
        primary key (id)
    ) engine=MyISAM;

    alter table prod.brand
       add constraint UK_g7ft8mes72rnsk746b7ibyln2 unique (code);

    alter table prod.category 
       add constraint UK_hqknmjh5423vchi4xkyhxlhg2 unique (slug);

    alter table prod.count 
       add constraint UK_18vr7dtwv2bmr0gya58j9aoem unique (code);

    alter table prod.customer 
       add constraint UK_j7ja2xvrxudhvssosd4nu1o92 unique (user_id);

    alter table prod.customer_group 
       add constraint UK_sq3i7v7mcfuu5wyo1k09fau29 unique (code);

    alter table prod.customer_resource 
       add constraint UK_7hysyb2oivjudrlfofqxhmtba unique (code);

    alter table prod.customer_status 
       add constraint UK_d3q20t05sxaaxpshsfv94cfms unique (code);

    alter table prod.destination 
       add constraint UK_a99mkfyhl65vc2n78ijodyoje unique (address_id);

    alter table prod.docket 
       add constraint UK_m8eoh52affco74plnewadng8j unique (code);

    alter table prod.employee 
       add constraint UK_mpps3d3r9pdvyjx3iqixi96fi unique (user_id);

    alter table prod.image 
       add constraint UK_2o7ijfxp9nv014xfgn93go7cd unique (name);

    alter table prod.image 
       add constraint UK_ctehsuv9mudy26ep17efcbj4h unique (path);

    alter table prod.office 
       add constraint UK_mlsa2m6po5222mgtojis7rnow unique (address_id);

    alter table prod.`order` 
       add constraint UK_28dgdc5siorptevhwl566i27v unique (code);

    alter table prod.order_resource 
       add constraint UK_t9tuhf1vpiqqfyr9cr6nnu7yv unique (code);

    alter table prod.preorder
       add constraint uc_preorder unique (user_id, product_id);

    alter table prod.product
       add constraint UK_h3w5r1mx6d0e5c6um32dgyjej unique (code);

    alter table prod.product 
       add constraint UK_88yb4l9100epddqsrdvxerhq9 unique (slug);

    alter table prod.property 
       add constraint UK_17f03s5ron7wrua25qyg8tx2v unique (code);

    alter table prod.purchase_order 
       add constraint UK_lyhuui3e3rh2a6itktx3rwrpe unique (code);

    alter table prod.review
       add constraint uc_review unique (user_id, product_id);

    alter table prod.role
       add constraint UK_c36say97xydpmgigg38qv5l2p unique (code);

    alter table prod.specification 
       add constraint UK_3lssqgpri39w9a5y932fgdvsa unique (code);

    alter table prod.supplier 
       add constraint UK_u0lh6hby20ok7au7646wrewl unique (code);

    alter table prod.supplier 
       add constraint UK_78419iap4p0q918rhlcr1phkl unique (address_id);

    alter table prod.tag 
       add constraint UK_1afk1y1o95l8oxxjxsqvelm3o unique (slug);

    alter table prod.transfer 
       add constraint UK_pvng2ahmu3ketx3y7xm2cbssc unique (code);

    alter table prod.transfer 
       add constraint UK_m24yqnms2wjuxyv59bbpyf8hn unique (export_docket_id);

    alter table prod.transfer 
       add constraint UK_7wdrpgv6fc6dycm0ymhkgxhsr unique (import_docket_id);

    alter table prod.user 
       add constraint UK_dhlcfg8h1drrgu0irs1ro3ohb unique (address_id);

    alter table prod.variant 
       add constraint UK_llpabmolrn143l5uh3dp92bgy unique (sku);

    alter table prod.warehouse 
       add constraint UK_9wk4ocyt0wv0hpffpr41aoweu unique (code);

    alter table prod.warehouse 
       add constraint UK_5hyew1b3bewu839bc54o2jo05 unique (address_id);

    alter table prod.waybill
       add constraint UK_o1ajfse9ste901tf5b97l7vm5 unique (code);

    alter table prod.waybill
       add constraint UK_qjsm9ff8ehn9sp3brtnvjkdjr unique (order_id);

    alter table prod.wish
       add constraint uc_wish unique (user_id, product_id);

    alter table prod.address
       add constraint FKqbjwfi50pdenou8j14knnffrh 
       foreign key (district_id) 
       references prod.district (id);

    alter table prod.address 
       add constraint FKf8x0jfwoo94op8u88og1ohdcn 
       foreign key (province_id) 
       references prod.province (id);

    alter table prod.address
       add constraint FKq7vspx6bqxq5lawbv2calw5lb
       foreign key (ward_id)
       references prod.ward (id);

    alter table prod.cart
       add constraint FKl70asp4l4w0jmbm1tqyofho4o
       foreign key (user_id)
       references prod.user (id);

    alter table prod.cart_variant
       add constraint FKhmyixkomygkkdpbgkpewg6bdx
       foreign key (cart_id)
       references prod.cart (id);

    alter table prod.cart_variant
       add constraint FKgn4wklrcnmghvlwccghh6l3fm
       foreign key (variant_id)
       references prod.variant (id);

    alter table prod.category
       add constraint FKap0cnk1255oj4bwam7in1hxxv 
       foreign key (category_id) 
       references prod.category (id);

    alter table prod.count 
       add constraint FK5fvpdf9v0472mrnb22hqihg8l 
       foreign key (warehouse_id) 
       references prod.warehouse (id);

    alter table prod.count_variant 
       add constraint FKtbly4gx9isdexbdsk58sqs0m0 
       foreign key (count_id) 
       references prod.count (id);

    alter table prod.count_variant 
       add constraint FK36g86gt9dsdw5pjayqqlgsfgq 
       foreign key (variant_id) 
       references prod.variant (id);

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

    alter table prod.destination 
       add constraint FKn0obgfthaq1r8ku3ysej74yk 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.district 
       add constraint FK276utu38g5lgqeth6pwfm3rw2 
       foreign key (province_id) 
       references prod.province (id);

    alter table prod.docket 
       add constraint FKlo46fav5ci97xbr53a67pc0wh 
       foreign key (order_id) 
       references prod.`order` (id);

    alter table prod.docket 
       add constraint FKckq6rph63qir38nenagh535vb 
       foreign key (purchase_order_id) 
       references prod.purchase_order (id);

    alter table prod.docket 
       add constraint FKcsyjfas113aro12r3cbpq599 
       foreign key (reason_id) 
       references prod.docket_reason (id);

    alter table prod.docket 
       add constraint FKoj8a1a4df4f01954wlf6usrcv 
       foreign key (warehouse_id) 
       references prod.warehouse (id);

    alter table prod.docket_variant 
       add constraint FK2rkqg8145y1g3eobexpab8xxj 
       foreign key (docket_id) 
       references prod.docket (id);

    alter table prod.docket_variant 
       add constraint FKln55e0ivaxua5yq25pl1tk9hk 
       foreign key (variant_id) 
       references prod.variant (id);

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

    alter table prod.notification
       add constraint FKb0yvoep4h4k92ipon31wmdf7e
       foreign key (user_id)
       references prod.user (id);

    alter table prod.office
       add constraint FKak81m3gkj8xq5t48xuflbj0kn 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.`order` 
       add constraint FK1oduxyuuo3n2g98l3j7754vym 
       foreign key (customer_id) 
       references prod.customer (id);

    alter table prod.`order` 
       add constraint FK1kb7gv71fjr6lrhy901bn9fy6 
       foreign key (order_cancellation_reason_id) 
       references prod.order_cancellation_reason (id);

    alter table prod.`order` 
       add constraint FKgr04wlw4hnfsloesmls7q4prc 
       foreign key (order_resource_id) 
       references prod.order_resource (id);

    alter table prod.order_resource 
       add constraint FKee6qcbh5rwnq9ecbajwmr8051 
       foreign key (customer_resource_id) 
       references prod.customer_resource (id);

    alter table prod.order_variant 
       add constraint FKtmpuci143q76w888a66xradw2 
       foreign key (order_id) 
       references prod.`order` (id);

    alter table prod.order_variant 
       add constraint FKe57gamff0q357714my3ibs6a 
       foreign key (variant_id) 
       references prod.variant (id);

    alter table prod.preorder
       add constraint FKnl5u7s90vitdf2fyb8vtnp7i2
       foreign key (product_id)
       references prod.product (id);

    alter table prod.preorder
       add constraint FKl0pm6jiq78m1rhg2ntmoacemw
       foreign key (user_id)
       references prod.user (id);

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

    alter table prod.product_tag 
       add constraint FK3b3a7hu5g2kh24wf0cwv3lgsm 
       foreign key (tag_id) 
       references prod.tag (id);

    alter table prod.product_tag 
       add constraint FK2rf7w3d88x20p7vuc2m9mvv91 
       foreign key (product_id) 
       references prod.product (id);

    alter table prod.purchase_order 
       add constraint FK13alrtuvkdl5mevgqvpwjp0ma 
       foreign key (destination_id) 
       references prod.destination (id);

    alter table prod.purchase_order 
       add constraint FK4traogu3jriq9u7e8rvm86k7i 
       foreign key (supplier_id) 
       references prod.supplier (id);

    alter table prod.purchase_order_variant 
       add constraint FKcknb9rwvu7dfki70nyye7x2ww 
       foreign key (purchase_order_id) 
       references prod.purchase_order (id);

    alter table prod.purchase_order_variant 
       add constraint FKs0ol41wsfln8hjuv3pkgkk60i 
       foreign key (variant_id) 
       references prod.variant (id);

    alter table prod.review
       add constraint FKiyof1sindb9qiqr9o8npj8klt
       foreign key (product_id)
       references prod.product (id);

    alter table prod.review
       add constraint FKiyf57dy48lyiftdrf7y87rnxi
       foreign key (user_id)
       references prod.user (id);

    alter table prod.storage_location
       add constraint FK956y7ykytekn259p907onqkiw 
       foreign key (warehouse_id) 
       references prod.warehouse (id);

    alter table prod.storage_location 
       add constraint FK7iurgk8f1wiounw6mur8fhc6 
       foreign key (variant_id) 
       references prod.variant (id);

    alter table prod.supplier 
       add constraint FK95a8oipih48obtbhltjy7hgvb 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.transfer 
       add constraint FKkpskc38eu9e36app8iaquigbg 
       foreign key (export_docket_id) 
       references prod.docket (id);

    alter table prod.transfer 
       add constraint FKd8wk8ohuol7ap3unjrsq1hc2i 
       foreign key (import_docket_id) 
       references prod.docket (id);

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

    alter table prod.variant 
       add constraint FKjjpllnln6hk6hj98uesgxno00 
       foreign key (product_id) 
       references prod.product (id);

    alter table prod.variant_inventory_limit 
       add constraint FKmyp7te4img1nhhmfwj7yr1ss7 
       foreign key (variant_id) 
       references prod.variant (id);

    alter table prod.ward
       add constraint FKslko72wj5nauqvsgefqkvwpsb
       foreign key (district_id)
       references prod.district (id);

    alter table prod.warehouse
       add constraint FKp7xymgre8vt94ihf75e9movyt 
       foreign key (address_id) 
       references prod.address (id);

    alter table prod.wish
       add constraint FKh3bvkvkslnehbxqma1x2eynqb
       foreign key (product_id)
       references prod.product (id);

    alter table prod.wish
       add constraint FKkqi4lso34o5xjkhiw71uadwvu
       foreign key (user_id)
       references prod.user (id);

    alter table prod.waybill
       add constraint FKtm4nwydrvd6klhjy7i9slhf83
       foreign key (order_id)
       references prod.`order` (id);
