package com.electro.service.general;

import com.electro.dto.general.UploadedImageResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    UploadedImageResponse store(MultipartFile image);

    Resource load(String imageName);

    void delete(String imageName);

}
