package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.dto.client.ClientOrderRequest;
import com.electro.dto.payment.PaypalCheckoutResponse;
import com.electro.service.order.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/client-api/orders")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class ClientOrderController {

    private OrderService orderService;

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
