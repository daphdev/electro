package com.electro.constant;

public interface SecurityConstants {
    String[] ADMIN_API_PATHS = {
            "/api/auth/info"
    };

    String[] CLIENT_API_PATHS = {
            "/client-api/users/**",
            "/client-api/wishes/**",
            "/client-api/preorders/**",
            "/client-api/notifications/**",
            "/client-api/reviews/**",
            "/client-api/carts/**",
            "/client-api/orders/**",
            "/client-api/chat/**"
    };

    String[] IGNORING_API_PATHS = {
            "/client-api/notifications/events",
            "/client-api/reviews/products/**",
            "/client-api/orders/success",
            "/client-api/orders/cancel"
    };

    interface Role {
        String ADMIN = "ADMIN";

        String EMPLOYEE = "EMPLOYEE";

        String CUSTOMER = "CUSTOMER";
    }
}
