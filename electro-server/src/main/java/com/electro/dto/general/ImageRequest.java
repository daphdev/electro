package com.electro.dto.general;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class ImageRequest {
    private @Nullable Long id;
    private String name;
    private String path;
    private String contentType;
    private Long size;
    private String group;
    private Boolean isThumbnail;
    private Boolean isEliminated;
}
