package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.CollectionWrapper;
import com.electro.dto.client.ClientCategoryResponse;
import com.electro.entity.product.Category;
import com.electro.exception.ResourceNotFoundException;
import com.electro.repository.product.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/client-api/categories")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class ClientCategoryController {

    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<CollectionWrapper<ClientCategoryResponse>> getAllCategories() {
        List<Category> firstCategories = categoryRepository.findByParentCategoryIsNull();
        List<ClientCategoryResponse> clientCategoryResponses = mapToResponse(firstCategories, 3);
        return ResponseEntity.status(HttpStatus.OK).body(CollectionWrapper.of(clientCategoryResponses));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ClientCategoryResponse> getCategory(@PathVariable("slug") String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.CATEGORY, FieldName.SLUG, slug));
        ClientCategoryResponse categoryResponse = mapToResponse(category, false);
        return ResponseEntity.status(HttpStatus.OK).body(categoryResponse);
    }

    /**
     * Thông tin category gồm có name, slug và danh sách con cấp 3
     */
    private List<ClientCategoryResponse> mapToResponse(List<Category> categories, int maxLevel) {
        if (maxLevel == 0) {
            return Collections.emptyList();
        }

        return categories.stream()
                .flatMap(category -> Stream.of(new ClientCategoryResponse()
                        .setCategoryName(category.getName())
                        .setCategorySlug(category.getSlug())
                        .setCategoryChildren(mapToResponse(category.getCategories(), maxLevel - 1))))
                .collect(Collectors.toList());
    }

    /**
     * Thông tin category gồm có name, slug, danh sách con cấp 1 và cha xa nhất (tạo breadcrumb)
     */
    private ClientCategoryResponse mapToResponse(Category category, boolean isParent) {
        ClientCategoryResponse categoryResponse = new ClientCategoryResponse();

        categoryResponse
                .setCategoryName(category.getName())
                .setCategorySlug(category.getSlug());

        if (!isParent) {
            categoryResponse.setCategoryChildren(mapToResponse(category.getCategories(), 1));
        }

        if (category.getParentCategory() == null) {
            return categoryResponse;
        }

        return categoryResponse.setCategoryParent(mapToResponse(category.getParentCategory(), true));
    }

}
