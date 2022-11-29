
package com.electro.dto.authentication;

import lombok.Data;

@Data
public class RegistrationRequest {
    private Long userID;
    private String tokenRegistration;
}
