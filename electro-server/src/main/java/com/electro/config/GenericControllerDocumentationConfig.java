package com.electro.config;

import com.electro.controller.GenericController;
import org.springdoc.core.fn.builders.operation.Builder;
import org.springdoc.webmvc.core.fn.SpringdocRouteBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.HandlerFunction;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.function.Consumer;

/**
 * Class này dùng để đăng ký tài liệu API cho các resource sử dụng GenericController
 */
@Configuration
public class GenericControllerDocumentationConfig {

    HandlerFunction<ServerResponse> handler = request -> ServerResponse.ok().build();

    @Bean
    public RouterFunction<ServerResponse> route() {
        return generateRoute("provinces")
                .and(generateRoute("districts"))
                .and(generateRoute("wards"))
                .and(generateRoute("addresses"))
                .and(generateRoute("users"))
                .and(generateRoute("roles"))
                .and(generateRoute("offices"))
                .and(generateRoute("departments"))
                .and(generateRoute("job-types"))
                .and(generateRoute("job-titles"))
                .and(generateRoute("job-levels"))
                .and(generateRoute("employees"))
                .and(generateRoute("customer-groups"))
                .and(generateRoute("customer-resources"))
                .and(generateRoute("customer-status"))
                .and(generateRoute("customers"))
                .and(generateRoute("properties"))
                .and(generateRoute("categories"))
                .and(generateRoute("tags"))
                .and(generateRoute("guarantees"))
                .and(generateRoute("units"))
                .and(generateRoute("suppliers"))
                .and(generateRoute("brands"))
                .and(generateRoute("specifications"))
                .and(generateRoute("products"))
                .and(generateRoute("variants"))
                .and(generateRoute("images"))
                .and(generateRoute("product-inventory-limits"))
                .and(generateRoute("variant-inventory-limits"))
                .and(generateRoute("warehouses"))
                .and(generateRoute("counts"))
                .and(generateRoute("destinations"))
                .and(generateRoute("docket-reasons"))
                .and(generateRoute("transfers"))
                .and(generateRoute("dockets"))
                .and(generateRoute("storage-locations"))
                .and(generateRoute("purchase-orders"))
                .and(generateRoute("order-resources"))
                .and(generateRoute("order-cancellation-reasons"))
                .and(generateRoute("orders"))
                .and(generateRoute("waybills"))
                .and(generateRoute("reviews"))
                .and(generateRoute("payment-methods"))
                .and(generateRoute("promotions"))
                .and(generateRoute("rooms"))
                .and(generateRoute("reward-strategies"));
    }

    private RouterFunction<ServerResponse> generateRoute(String resource) {
        return SpringdocRouteBuilder.route()
                .GET("/api/" + resource, handler, operation(resource, "getAllResources"))
                .GET("/api/" + resource + "/{id}", handler, operation(resource, "getResource"))
                .POST("/api/" + resource, handler, operation(resource, "createResource"))
                .PUT("/api/" + resource + "/{id}", handler, operation(resource, "updateResource"))
                .DELETE("/api/" + resource + "/{id}", handler, operation(resource, "deleteResource"))
                .DELETE("/api/" + resource, handler, operation(resource, "deleteResources"))
                .build();
    }

    private Consumer<Builder> operation(String resource, String handlerMethod) {
        return ops -> ops.operationId(resource).beanClass(GenericController.class).beanMethod(handlerMethod);
    }

}
