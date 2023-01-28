package com.electro.constant;

public interface SecurityConstants {
    String[] ADMIN_API_PATHS = {
            "/api/users",
            "/api/roles"
    };

    interface Role {
        String ADMIN = "ADMIN";

        String EMPLOYEE = "EMPLOYEE";

        String CUSTOMER = "CUSTOMER";
    }
}
