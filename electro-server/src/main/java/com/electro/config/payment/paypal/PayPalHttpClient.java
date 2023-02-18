package com.electro.config.payment.paypal;

import com.electro.dto.payment.AccessTokenResponseDTO;
import com.electro.dto.payment.ClientTokenDTO;
import com.electro.dto.payment.PaypalRequest;
import com.electro.dto.payment.PaypalResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@AllArgsConstructor
@Slf4j
public class PayPalHttpClient {
    private final HttpClient httpClient = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build();;

    private final PaypalConfig paypalConfig;

    private final ObjectMapper objectMapper;

    public AccessTokenResponseDTO getPaypalAccessToken() throws Exception {
        var request = HttpRequest.newBuilder()
                .uri(URI.create(PayPalEndpoints.createUrl(paypalConfig.getBaseUrl(), PayPalEndpoints.GET_ACCESS_TOKEN)))
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, encodeBasicCredentials())
                .header(HttpHeaders.ACCEPT_LANGUAGE, "en_US")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString("grant_type=client_credentials"))
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();
        return objectMapper.readValue(content, AccessTokenResponseDTO.class);
    }

    public ClientTokenDTO getClientToken() throws Exception {
        var accessTokenDto = getPaypalAccessToken();
        var request = HttpRequest.newBuilder()
                .uri(URI.create(PayPalEndpoints.createUrl(paypalConfig.getBaseUrl(), PayPalEndpoints.GET_CLIENT_TOKEN)))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessTokenDto.getAccessToken())
                .header(HttpHeaders.ACCEPT_LANGUAGE, "en_US")
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();

        return objectMapper.readValue(content, ClientTokenDTO.class);
    }

    public PaypalResponse createPaypalTransaction(PaypalRequest paypalRequest) throws Exception {
        var accessTokenDto = getPaypalAccessToken();
        var payload = objectMapper.writeValueAsString(paypalRequest);

        var request = HttpRequest.newBuilder()
                .uri(URI.create(PayPalEndpoints.createUrl(paypalConfig.getBaseUrl(), PayPalEndpoints.ORDER_CHECKOUT)))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessTokenDto.getAccessToken())
                .header("Prefer", "return=representation")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();
        return objectMapper.readValue(content, PaypalResponse.class);
    }

    public PaypalResponse capturePaypalTransaction(String id, String payerId) throws Exception {
        var accessTokenDto = getPaypalAccessToken();
        var request = HttpRequest.newBuilder()
                .uri(URI.create(PayPalEndpoints.createCaptureUrl(paypalConfig.getBaseUrl(), PayPalEndpoints.ORDER_CHECKOUT, id)))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessTokenDto.getAccessToken())
                .header("Prefer", "return=representation")
                .header("PayPal-Request-Id", payerId)
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        // TODO: convert json response to object if we need (Using debug to check propeties response)
        //var content = response.body();
        //return objectMapper.readValue(content, PaypalResponse.class);
        return null;
    }


    private String encodeBasicCredentials() {
        var input = paypalConfig.getClientId() + ":" + paypalConfig.getSecret();
        return "Basic " + Base64.getEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }
}
