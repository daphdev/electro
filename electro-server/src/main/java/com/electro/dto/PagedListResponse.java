package com.electro.dto;

import lombok.Value;
import org.springframework.data.domain.Page;

import java.util.List;

@Value
public class PagedListResponse<T> implements ListWrapperResponse {
    List<T> content;
    int page;
    int size;
    long totalElements;
    int totalPages;
    boolean last;

    public <E> PagedListResponse(List<T> content, Page<E> page) {
        this.content = content;
        this.page = page.getNumber() + 1;
        this.size = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.last = page.isLast();
    }
}
