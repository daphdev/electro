package com.electro.mapper.client;

import com.electro.dto.client.ClientCategoryResponse;
import com.electro.entity.product.Category;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ClientCategoryMapper {

    /**
     * Thông tin category gồm có name, slug và danh sách con cấp 3
     */
    public List<ClientCategoryResponse> entityToResponse(List<Category> categories, int maxLevel) {
        if (maxLevel == 0) {
            return Collections.emptyList();
        }

        return categories.stream()
                .flatMap(category -> Stream.of(new ClientCategoryResponse()
                        .setCategoryName(category.getName())
                        .setCategorySlug(category.getSlug())
                        .setCategoryChildren(entityToResponse(category.getCategories(), maxLevel - 1))))
                .collect(Collectors.toList());
    }

    /**
     * Thông tin category gồm có name, slug, danh sách con cấp 1 và cha xa nhất (tạo breadcrumb)
     */
    public ClientCategoryResponse entityToResponse(@Nullable Category category, boolean isParent) {
        if (category == null) {
            return null;
        }

        ClientCategoryResponse categoryResponse = new ClientCategoryResponse();

        categoryResponse
                .setCategoryName(category.getName())
                .setCategorySlug(category.getSlug());

        if (!isParent) {
            categoryResponse.setCategoryChildren(entityToResponse(category.getCategories(), 1));
        }

        if (category.getParentCategory() == null) {
            return categoryResponse;
        }

        return categoryResponse.setCategoryParent(entityToResponse(category.getParentCategory(), true));
    }

}
