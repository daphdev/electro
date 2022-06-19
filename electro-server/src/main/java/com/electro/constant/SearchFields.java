package com.electro.constant;

import java.util.List;

public interface SearchFields {
    List<String> PROVINCE = List.of("name", "code");
    List<String> DISTRICT = List.of("name", "code", "province.name", "province.code");
    List<String> ADDRESS = List.of("line", "province.name", "province.code", "district.name", "district.code");
    List<String> USER = List.of("username", "fullname", "email", "phone",
            "address.province.name", "address.province.code", "address.district.name", "address.district.code");
    List<String> ROLE = List.of("code", "name");
    List<String> BRAND = List.of("name", "code", "description");
}
