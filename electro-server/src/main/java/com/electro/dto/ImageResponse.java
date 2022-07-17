package com.electro.dto;

import lombok.Value;

@Value
public class ImageResponse {
    String name;
    String path;
    String type;
    long size;
}
