package com.electro.constant;

import java.util.List;

public interface SearchFields {
    List<String> PROVINCE = List.of("name", "code");
    List<String> DISTRICT = List.of("name", "code");
    List<String> ADDRESS = List.of("line", "province.name", "province.code", "district.name", "district.code");
    List<String> USER = List.of("username", "fullname", "email", "phone",
            "address.province.name", "address.province.code", "address.district.name", "address.district.code");
    List<String> ROLE = List.of("code", "name");
    List<String> OFFICE = List.of("name", "address.province.name", "address.province.code",
            "address.district.name", "address.district.code");
    List<String> DEPARTMENT = List.of("name", "code");
    List<String> JOB_TITLE = List.of("name", "code");
    List<String> JOB_LEVEL = List.of("name", "code");
    List<String> JOB_TYPE = List.of("name", "code");
    List<String> EMPLOYEE = List.of("user.username", "user.fullname", "user.email", "user.phone",
            "user.address.province.name", "user.address.province.code",
            "user.address.district.name", "user.address.district.code", "office.name");
}
