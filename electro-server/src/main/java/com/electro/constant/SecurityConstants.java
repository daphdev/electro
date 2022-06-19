package com.electro.constant;

import java.util.List;

public interface SecurityConstants {
    List<String> ADMIN_API_PATHS = List.of(
            "/api/users",
            "/api/roles"
    );
}
