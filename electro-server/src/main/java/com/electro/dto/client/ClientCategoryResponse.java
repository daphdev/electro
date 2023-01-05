package com.electro.dto.client;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientCategoryResponse {
    private String categoryName;
    private String categorySlug;
    private List<ClientCategoryResponse> categoryChildren = new ArrayList<>();
    @Nullable
    private ClientCategoryResponse categoryParent;
}
