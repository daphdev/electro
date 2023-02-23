package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.ListResponse;
import com.electro.dto.client.ClientOrderDetailResponse;
import com.electro.dto.client.ClientOrderRequest;
import com.electro.dto.client.ClientSimpleOrderResponse;
import com.electro.dto.payment.PaypalCheckoutResponse;
import com.electro.entity.order.Order;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.client.ClientOrderMapper;
import com.electro.repository.order.OrderRepository;
import com.electro.service.order.OrderService;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/client-api/orders")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class ClientOrderController {

    private OrderRepository orderRepository;
    private ClientOrderMapper clientOrderMapper;
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<ListResponse<ClientSimpleOrderResponse>> getAllOrders(
            Authentication authentication,
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter
    ) {
        String username = authentication.getName();
        Page<Order> orders = orderRepository.findAllByUsername(username, sort, filter, PageRequest.of(page - 1, size));
        List<ClientSimpleOrderResponse> clientReviewResponses = orders.map(clientOrderMapper::entityToResponse).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ListResponse.of(clientReviewResponses, orders));
    }

    @GetMapping("/{code}")
    public ResponseEntity<ClientOrderDetailResponse> getOrder(@PathVariable String code) {
        ClientOrderDetailResponse clientOrderDetailResponse = orderRepository.findByCode(code)
                .map(clientOrderMapper::entityToDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ORDER_CODE, code));
        return ResponseEntity.status(HttpStatus.OK).body(clientOrderDetailResponse);
    }

    @PutMapping("/cancel/{code}")
    public ResponseEntity<ObjectNode> cancelOrder(@PathVariable String code) {
        orderService.cancelOrder(code);
        return ResponseEntity.status(HttpStatus.OK).body(new ObjectNode(JsonNodeFactory.instance));
    }

    @PostMapping
    public ResponseEntity<PaypalCheckoutResponse> createClientOrder(@RequestBody ClientOrderRequest orderRequest) {
        PaypalCheckoutResponse paypalCheckoutResponse = new PaypalCheckoutResponse(orderService.createClientOrder(orderRequest));
        return ResponseEntity.status(HttpStatus.OK).body(paypalCheckoutResponse);
    }

    @GetMapping(value = "/success")
    public RedirectView paymentSuccessAndCaptureTransaction(HttpServletRequest request) {
        String paypalOrderId = request.getParameter("token");
        String payerId = request.getParameter("PayerID");

        orderService.captureTransactionPaypal(paypalOrderId, payerId);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(AppConstants.DOMAIN);
        return redirectView;
    }

}
