package com.electro.constant;

import java.util.List;

public interface SearchFields {
    List<String> PROVINCE = List.of(
            "name",
            "code"
    );

    List<String> DISTRICT = List.of(
            "name",
            "code",
            "province.name",
            "province.code"
    );

    List<String> ADDRESS = List.of(
            "line",
            "province.name",
            "province.code",
            "district.name",
            "district.code"
    );

    List<String> USER = List.of(
            "username",
            "fullname",
            "email",
            "phone",
            "address.line",
            "address.province.name",
            "address.province.code",
            "address.district.name",
            "address.district.code"
    );

    List<String> ROLE = List.of(
            "code",
            "name"
    );

    List<String> OFFICE = List.of(
            "name",
            "address.line",
            "address.province.name",
            "address.province.code",
            "address.district.name",
            "address.district.code"
    );

    List<String> DEPARTMENT = List.of(
            "name"
    );

    List<String> JOB_TITLE = List.of(
            "name"
    );

    List<String> JOB_LEVEL = List.of(
            "name"
    );

    List<String> JOB_TYPE = List.of(
            "name"
    );

    List<String> EMPLOYEE = List.of(
            "user.username",
            "user.fullname",
            "user.email",
            "user.phone",
            "user.address.line",
            "user.address.province.name",
            "user.address.province.code",
            "user.address.district.name",
            "user.address.district.code",
            "office.name",
            "office.address.line",
            "office.address.province.name",
            "office.address.province.code",
            "office.address.district.name",
            "office.address.district.code",
            "department.name",
            "jobType.name",
            "jobLevel.name",
            "jobTitle.name"
    );

    List<String> CUSTOMER_GROUP = List.of(
            "code",
            "name",
            "description",
            "color"
    );

    List<String> CUSTOMER_RESOURCE = List.of(
            "code",
            "name",
            "description",
            "color"
    );

    List<String> CUSTOMER_STATUS = List.of(
            "code",
            "name",
            "description",
            "color"
    );

    List<String> CUSTOMER = List.of(
            "user.username",
            "user.fullname",
            "user.email",
            "user.phone",
            "user.address.line",
            "user.address.province.name",
            "user.address.province.code",
            "user.address.district.name",
            "user.address.district.code",
            "customerGroup.code",
            "customerGroup.name",
            "customerGroup.description",
            "customerGroup.color",
            "customerResource.code",
            "customerResource.name",
            "customerResource.description",
            "customerResource.color",
            "customerStatus.code",
            "customerStatus.name",
            "customerStatus.description",
            "customerStatus.color"
    );

    List<String> PROPERTY = List.of(
            "name",
            "code",
            "type",
            "description"
    );

    List<String> CATEGORY = List.of(
            "name",
            "description"
    );

    List<String> BRAND = List.of(
            "name",
            "code",
            "description"
    );
}
