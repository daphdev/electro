package com.electro.service.review;

import com.electro.dto.review.ReviewRequest;
import com.electro.dto.review.ReviewResponse;
import com.electro.service.CrudService;

public interface ReviewService extends CrudService<Long, ReviewRequest, ReviewResponse> {}
