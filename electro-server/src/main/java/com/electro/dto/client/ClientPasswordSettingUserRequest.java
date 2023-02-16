package com.electro.dto.client;

import lombok.Data;

@Data
public class ClientPasswordSettingUserRequest {
    private String oldPassword;
    private String newPassword;
}
