package com.electro.dto.general;

import lombok.Data;

@Data
public class ImageResponse {
    private Long id;
    private String name;
    private String path;
    private String contentType;
    private Long size;
    private String group;
    private Boolean isThumbnail;
    private Boolean isEliminated;
}
