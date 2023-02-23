package com.electro.dto;

import lombok.Value;
import org.springframework.data.domain.Page;

import java.util.List;

@Value
public class ListResponse<T> {
    List<T> content;
    int page;
    int size;
    long totalElements;
    int totalPages;
    boolean last;

    public <E> ListResponse(List<T> content, Page<E> page) {
        this.content = content;
        this.page = page.getNumber() + 1;
        this.size = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.last = page.isLast();
    }

    public static <T, E> ListResponse<T> of(List<T> content, Page<E> page) {
        return new ListResponse<>(content, page);
    }
}
