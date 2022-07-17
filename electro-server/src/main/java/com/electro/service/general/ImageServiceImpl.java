package com.electro.service.general;

import com.electro.dto.ImageResponse;
import com.electro.exception.FileStorageException;
import com.electro.exception.StorageFileNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class ImageServiceImpl implements ImageService {

    private static final Path IMAGE_DIR = Paths.get(System.getProperty("user.dir")).resolve("image-dir");

    public ImageServiceImpl() {
        if (!Files.exists(IMAGE_DIR)) {
            try {
                Files.createDirectories(IMAGE_DIR);
            } catch (IOException e) {
                throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", e);
            }
        }
    }

    @Override
    public ImageResponse store(MultipartFile image) {
        String imageName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));
        String imagePath = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(imageName)
                .toUriString();

        try {
            if (imageName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + imageName);
            }

            Path targetLocation = IMAGE_DIR.resolve(imageName);
            Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return new ImageResponse(imageName, imagePath, image.getContentType(), image.getSize());
        } catch (IOException e) {
            throw new FileStorageException("Could not store file " + imageName + ". Please try again!", e);
        }
    }

    @Override
    public Resource load(String imageName) {
        try {
            Path imagePath = IMAGE_DIR.resolve(imageName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("File not found " + imageName);
            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("File not found " + imageName, e);
        }
    }

}
