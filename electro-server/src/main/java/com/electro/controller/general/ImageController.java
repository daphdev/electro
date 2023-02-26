package com.electro.controller.general;

import com.electro.constant.AppConstants;
import com.electro.dto.CollectionWrapper;
import com.electro.dto.general.UploadedImageResponse;
import com.electro.service.general.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
@Slf4j
public class ImageController {

    private ImageService imageService;

    @PostMapping("/upload-single")
    public ResponseEntity<UploadedImageResponse> uploadSingleImage(@RequestParam("image") MultipartFile image) {
        return ResponseEntity.status(HttpStatus.OK).body(imageService.store(image));
    }

    @PostMapping("/upload-multiple")
    public ResponseEntity<CollectionWrapper<UploadedImageResponse>> uploadMultipleImages(@RequestParam("images") MultipartFile[] images) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CollectionWrapper<>(Stream.of(images)
                        .map(imageService::store)
                        .collect(Collectors.toList())));
    }

    @GetMapping("/{imageName:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String imageName, HttpServletRequest request) {
        Resource resource = imageService.load(imageName);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{imageName:.+}")
    public ResponseEntity<Void> deleteImage(@PathVariable String imageName) {
        imageService.delete(imageName);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMultipleImages(@RequestBody List<String> imageNames) {
        imageNames.forEach(imageService::delete);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
