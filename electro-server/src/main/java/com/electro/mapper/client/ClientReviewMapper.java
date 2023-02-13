package com.electro.mapper.client;

import com.electro.dto.client.ClientReviewRequest;
import com.electro.dto.client.ClientReviewResponse;
import com.electro.dto.client.ClientSimpleReviewResponse;
import com.electro.entity.review.Review;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.product.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@AllArgsConstructor
public class ClientReviewMapper {

    private UserRepository userRepository;
    private ProductRepository productRepository;
    private ClientProductMapper clientProductMapper;

    public Review requestToEntity(ClientReviewRequest request) {
        Review entity = new Review();
        entity.setUser(userRepository.getById(request.getUserId()));
        entity.setProduct(productRepository.getById(request.getProductId()));
        entity.setRatingScore(request.getRatingScore());
        entity.setContent(request.getContent());
        entity.setStatus(request.getStatus());
        return entity;
    }

    public ClientReviewResponse entityToResponse(Review entity) {
        ClientReviewResponse response = new ClientReviewResponse();
        response.setReviewId(entity.getId());
        response.setReviewCreatedAt(entity.getCreatedAt());
        response.setReviewUpdatedAt(entity.getUpdatedAt());
        // TODO: Triển khai `saleable` cho productResponse ở đây
        response.setReviewProduct(clientProductMapper.entityToListedResponse(entity.getProduct(), Collections.emptyList()));
        response.setReviewRatingScore(entity.getRatingScore());
        response.setReviewContent(entity.getContent());
        response.setReviewReply(entity.getReply());
        response.setReviewStatus(entity.getStatus());
        return response;
    }

    public ClientSimpleReviewResponse entityToSimpleResponse(Review entity) {
        ClientSimpleReviewResponse response = new ClientSimpleReviewResponse();
        response.setReviewId(entity.getId());
        response.setReviewCreatedAt(entity.getCreatedAt());
        response.setReviewUpdatedAt(entity.getUpdatedAt());
        response.setReviewUser(new ClientSimpleReviewResponse.UserResponse()
                .setUserId(entity.getUser().getId())
                .setUserUsername(entity.getUser().getUsername())
                .setUserFullname(entity.getUser().getFullname()));
        response.setReviewRatingScore(entity.getRatingScore());
        response.setReviewContent(entity.getContent());
        response.setReviewReply(entity.getReply());
        response.setReviewStatus(entity.getStatus());
        return response;
    }

    public Review partialUpdate(Review entity, ClientReviewRequest request) {
        entity.setRatingScore(request.getRatingScore());
        entity.setContent(request.getContent());
        entity.setStatus(request.getStatus());
        return entity;
    }

}
