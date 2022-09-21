package com.electro.dto;

import lombok.Value;

import java.util.List;

@Value
public class CollectionWrapper<T> {
    List<T> content;
    long totalElements;

    public CollectionWrapper(List<T> content) {
        this.content = content;
        this.totalElements = content.size();
    }
}
