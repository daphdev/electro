package com.electro.service.statistic;

import com.electro.dto.statistic.StatisticResource;
import com.electro.dto.statistic.StatisticResponse;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.customer.CustomerRepository;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.product.BrandRepository;
import com.electro.repository.product.ProductRepository;
import com.electro.repository.product.SupplierRepository;
import com.electro.repository.promotion.PromotionRepository;
import com.electro.repository.waybill.WaybillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService{

    private CustomerRepository customerRepository;
    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private WaybillRepository waybillRepository;
    private PromotionRepository promotionRepository;
    private SupplierRepository supplierRepository;
    private BrandRepository brandRepository;
    private UserRepository userRepository;


    @Override
    public StatisticResponse getStatistic() {
        StatisticResponse statisticResponse = new StatisticResponse();

        int totalCustomer = customerRepository.countByCustomerId();
        int totalProduct = productRepository.countByProductId();
        int totalOrder = orderRepository.countByOrderId();
        int totalWaybill = waybillRepository.countByWaybillId();
        int totalPromotion = promotionRepository.countByPromotionId();
        int totalSupplier = supplierRepository.countBySupplierId();
        int totalBrand = brandRepository.countByBrandId();
        // TODO: MISSING VOTE (...)

        List<StatisticResource> statisticResourceList = userRepository.getUserCountByCreateDate();

        statisticResponse.setTotalCustomer(totalCustomer);
        statisticResponse.setTotalProduct(totalProduct);
        statisticResponse.setTotalOrder(totalOrder);
        statisticResponse.setTotalWaybill(totalWaybill);
        statisticResponse.setTotalPromotionActive(totalPromotion);
        statisticResponse.setTotalSupplier(totalSupplier);
        statisticResponse.setTotalBrand(totalBrand);

        return statisticResponse;
    }
}
