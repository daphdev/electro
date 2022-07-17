package com.electro.service.general;

import com.electro.dto.ImageResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    ImageResponse store(MultipartFile image);

    Resource load(String imageName);

}
