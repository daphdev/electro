package com.electro.dto.json;

import lombok.Data;

import java.util.List;

@Data
public class ProductPropertyItem {
    private Long id;
    private String name;
    private String code;
    private List<String> value;
}
