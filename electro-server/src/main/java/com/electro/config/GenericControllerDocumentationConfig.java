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
                .and(generateRoute("brands"));
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
