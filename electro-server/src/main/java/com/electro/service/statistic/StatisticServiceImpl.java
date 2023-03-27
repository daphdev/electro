package com.electro.service.statistic;

import com.electro.dto.statistic.StatisticResource;
import com.electro.dto.statistic.StatisticResponse;
import com.electro.repository.authentication.UserProjectionRepository;
import com.electro.repository.customer.CustomerRepository;
import com.electro.repository.order.OrderProjectionRepository;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.product.BrandRepository;
import com.electro.repository.product.ProductRepository;
import com.electro.repository.product.SupplierRepository;
import com.electro.repository.promotion.PromotionRepository;
import com.electro.repository.review.ReviewProjectionRepository;
import com.electro.repository.review.ReviewRepository;
import com.electro.repository.waybill.WaybillProjectionRepository;
import com.electro.repository.waybill.WaybillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private CustomerRepository customerRepository;
    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private WaybillRepository waybillRepository;
    private PromotionRepository promotionRepository;
    private SupplierRepository supplierRepository;
    private BrandRepository brandRepository;
    private ReviewRepository reviewRepository;
    private UserProjectionRepository userProjectionRepository;
    private OrderProjectionRepository orderProjectionRepository;
    private WaybillProjectionRepository waybillProjectionRepository;
    private ReviewProjectionRepository reviewProjectionRepository;

    @Override
    public StatisticResponse getStatistic() {
        StatisticResponse statisticResponse = new StatisticResponse();

        // TODO: Nên dùng tên hàm `count` hợp lý hơn, như `countAll()`
        int totalCustomer = customerRepository.countByCustomerId();
        int totalProduct = productRepository.countByProductId();
        int totalOrder = orderRepository.countByOrderId();
        int totalWaybill = waybillRepository.countByWaybillId();
        int totalReview = reviewRepository.countByReviewId();
        int totalActivePromotion = promotionRepository.countByPromotionId();
        int totalSupplier = supplierRepository.countBySupplierId();
        int totalBrand = brandRepository.countByBrandId();

        List<StatisticResource> statisticRegistration = userProjectionRepository.getUserCountByCreateDate();
        List<StatisticResource> statisticOrder = orderProjectionRepository.getOrderCountByCreateDate();
        List<StatisticResource> statisticReview = reviewProjectionRepository.getReviewCountByCreateDate();
        List<StatisticResource> statisticWaybill = waybillProjectionRepository.getWaybillCountByCreateDate();

        statisticResponse.setTotalCustomer(totalCustomer);
        statisticResponse.setTotalProduct(totalProduct);
        statisticResponse.setTotalOrder(totalOrder);
        statisticResponse.setTotalWaybill(totalWaybill);
        statisticResponse.setTotalReview(totalReview);
        statisticResponse.setTotalActivePromotion(totalActivePromotion);
        statisticResponse.setTotalSupplier(totalSupplier);
        statisticResponse.setTotalBrand(totalBrand);
        statisticResponse.setStatisticRegistration(statisticRegistration);
        statisticResponse.setStatisticOrder(statisticOrder);
        statisticResponse.setStatisticReview(statisticReview);
        statisticResponse.setStatisticWaybill(statisticWaybill);

        return statisticResponse;
    }

}
