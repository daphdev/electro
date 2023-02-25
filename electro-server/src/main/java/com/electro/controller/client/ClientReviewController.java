package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.ListResponse;
import com.electro.dto.client.ClientReviewRequest;
import com.electro.dto.client.ClientReviewResponse;
import com.electro.dto.client.ClientSimpleReviewResponse;
import com.electro.entity.review.Review;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.client.ClientReviewMapper;
import com.electro.repository.review.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/client-api/reviews")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class ClientReviewController {

    private ReviewRepository reviewRepository;
    private ClientReviewMapper clientReviewMapper;

    @GetMapping("/products/{productSlug}")
    public ResponseEntity<ListResponse<ClientSimpleReviewResponse>> getAllReviewsByProduct(
            @PathVariable String productSlug,
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter
    ) {
        Page<Review> reviews = reviewRepository.findAllByProductSlug(productSlug, sort, filter, PageRequest.of(page - 1, size));
        List<ClientSimpleReviewResponse> clientReviewResponses = reviews.map(clientReviewMapper::entityToSimpleResponse).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ListResponse.of(clientReviewResponses, reviews));
    }

    @GetMapping
    public ResponseEntity<ListResponse<ClientReviewResponse>> getAllReviewsByUser(
            Authentication authentication,
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter
    ) {
        String username = authentication.getName();
        Page<Review> reviews = reviewRepository.findAllByUsername(username, sort, filter, PageRequest.of(page - 1, size));
        List<ClientReviewResponse> clientReviewResponses = reviews.map(clientReviewMapper::entityToResponse).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ListResponse.of(clientReviewResponses, reviews));
    }

    @PostMapping
    public ResponseEntity<ClientReviewResponse> createReview(@RequestBody ClientReviewRequest request) {
        Review entity = reviewRepository.save(clientReviewMapper.requestToEntity(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(clientReviewMapper.entityToResponse(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientReviewResponse> updateReview(@PathVariable Long id,
                                                             @RequestBody ClientReviewRequest request) {
        ClientReviewResponse clientReviewResponse = reviewRepository.findById(id)
                .map(existingEntity -> clientReviewMapper.partialUpdate(existingEntity, request))
                .map(reviewRepository::save)
                .map(clientReviewMapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.REVIEW, FieldName.ID, id));
        return ResponseEntity.status(HttpStatus.OK).body(clientReviewResponse);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteReviews(@RequestBody List<Long> ids) {
        reviewRepository.deleteAllById(ids);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
