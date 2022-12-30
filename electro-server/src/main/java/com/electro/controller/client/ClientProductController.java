package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.dto.ListResponse;
import com.electro.dto.client.ClientListedProductResponse;
import com.electro.entity.general.Image;
import com.electro.entity.inventory.Docket;
import com.electro.entity.inventory.DocketVariant;
import com.electro.entity.product.Product;
import com.electro.entity.product.Variant;
import com.electro.projection.inventory.SimpleProductInventory;
import com.electro.repository.ProjectionRepository;
import com.electro.repository.product.ProductRepository;
import cz.jirutka.rsql.parser.ast.ComparisonOperator;
import io.github.perplexhub.rsql.RSQLCustomPredicate;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/client-api/products")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class ClientProductController {

    private ProductRepository productRepository;
    private ProjectionRepository projectionRepository;

    @GetMapping
    public ResponseEntity<ListResponse<ClientListedProductResponse>> getAllProducts(
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "filter", required = false) @Nullable String filter,
            @RequestParam(name = "saleable", required = false) boolean saleable,
            @RequestParam(name = "newable", required = false) boolean newable
    ) {
        // Xử lý `filter` thành Specification
        RSQLCustomPredicate<String> jsonPredicate = new RSQLCustomPredicate<>(
                new ComparisonOperator("=json=", true),
                String.class,
                input -> {
                    CriteriaBuilder cb = input.getCriteriaBuilder();

                    // Lấy phần còn lại của danh sách `input.getArguments()` sau khi bỏ qua phần tử đầu tiên
                    List<Object> values = input.getArguments().stream().skip(1).collect(Collectors.toList());

                    return cb.function("JSON_EXTRACT", String.class,
                            input.getPath(),
                            cb.function("REPLACE", String.class,
                                    cb.function("JSON_UNQUOTE", String.class,
                                            cb.function("JSON_SEARCH", String.class,
                                                    input.getPath(),
                                                    cb.literal("one"),
                                                    cb.literal(input.getArguments().get(0)))
                                    ),
                                    cb.literal(".code"),
                                    cb.literal(".value")
                            )
                    ).in(values);
                });

        Specification<Product> filterable = RSQLJPASupport.toSpecification(filter, List.of(jsonPredicate));

        // Lọc theo `saleable` (có thể bán) và `newable` (thứ tự mới nhất)
        Specification<Product> docketable = (root, query, cb) -> {
            List<Predicate> wheres = new ArrayList<>();

            Join<Product, Variant> variant = root.join("variants");
            Join<Variant, DocketVariant> docketVariant = variant.join("docketVariants");
            Join<DocketVariant, Docket> docket = docketVariant.join("docket");

            if (saleable) {
                Subquery<Integer> subquery = query.subquery(Integer.class);
                Root<Variant> variantSq = subquery.from(Variant.class);
                Join<Variant, DocketVariant> docketVariantSq = variantSq.join("docketVariants");
                Join<DocketVariant, Docket> docketSq = docketVariantSq.join("docket");

                subquery.select(cb.diff(
                        cb.sum(
                                cb.<Integer>selectCase()
                                        .when(cb.and(cb.equal(docketSq.get("type"), 1),
                                                        cb.equal(docketSq.get("status"), 3)),
                                                docketVariantSq.get("quantity"))
                                        .when(cb.and(cb.equal(docketSq.get("type"), 2),
                                                        cb.equal(docketSq.get("status"), 3)),
                                                cb.prod(docketVariantSq.get("quantity"), -1))
                                        .otherwise(0)
                        ),
                        cb.sum(
                                cb.<Integer>selectCase()
                                        .when(cb.and(cb.equal(docketSq.get("type"), 2),
                                                        docketSq.get("status").in(1, 2)),
                                                docketVariantSq.get("quantity"))
                                        .otherwise(0)
                        )
                ));

                subquery.where(cb.equal(variantSq.get("product").get("id"), root.get("id")));
                subquery.groupBy(variantSq.get("product").get("id"));

                wheres.add(cb.greaterThan(subquery, 0));
            }

            if (newable) {
                wheres.add(cb.equal(docket.get("type"), 1));
                wheres.add(cb.equal(docket.get("status"), 3));

                query.orderBy(cb.desc(cb.max(docket.get("createdAt"))), cb.asc(root.get("id")));
            }

            Optional.ofNullable(filterable.toPredicate(root, query, cb)).ifPresent(wheres::add);

            query.where(wheres.toArray(Predicate[]::new));
            query.groupBy(root.get("id"));

            return query.getRestriction();
        };

        // Phân trang
        Pageable pageable = PageRequest.of(page - 1, size);

        // Lấy danh sách sản phẩm theo điều kiện lọc và phân trang
        Page<Product> products = productRepository.findAll(docketable, pageable);

        // Lấy thông tin tồn kho của sản phẩm
        List<Long> productIds = products.map(Product::getId).toList();
        List<SimpleProductInventory> productInventories = projectionRepository.findSimpleProductInventories(productIds);

        List<ClientListedProductResponse> clientListedProductResponses = products
                .map(product -> mapToResponse(product, productInventories)).toList();

        return ResponseEntity.status(HttpStatus.OK).body(ListResponse.of(clientListedProductResponses, products));
    }

    private ClientListedProductResponse mapToResponse(Product product, List<SimpleProductInventory> productInventories) {
        ClientListedProductResponse clientListedProductResponse = new ClientListedProductResponse();

        clientListedProductResponse
                .setProductId(product.getId())
                .setProductName(product.getName())
                .setProductSlug(product.getSlug())
                .setProductThumbnail(product.getImages().stream()
                        .filter(Image::getIsThumbnail)
                        .findAny()
                        .map(Image::getPath)
                        .orElse(null));

        List<Double> prices = product.getVariants().stream()
                .map(Variant::getPrice).distinct().sorted().collect(Collectors.toList());

        clientListedProductResponse.setProductPriceRange(
                prices.size() == 1 ? List.of(prices.get(0)) : List.of(prices.get(0), prices.get(prices.size() - 1))
        );

        clientListedProductResponse.setProductVariants(product.getVariants().stream()
                .map(variant -> new ClientListedProductResponse.ClientListedVariantResponse()
                        .setVariantId(variant.getId())
                        .setVariantPrice(variant.getPrice())
                        .setVariantProperties(variant.getProperties()))
                .collect(Collectors.toList()));

        clientListedProductResponse.setProductSaleable(productInventories.stream()
                .filter(productInventory -> productInventory.getProductId().equals(product.getId()))
                .findAny()
                .map(productInventory -> productInventory.getCanBeSold() > 0)
                .orElse(false));

        return clientListedProductResponse;
    }

}
