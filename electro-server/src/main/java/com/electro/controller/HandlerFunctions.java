package com.electro.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

@Controller
public class HandlerFunctions {

    public ServerResponse returnText(ServerRequest request) {
        return ServerResponse.ok().body("Test Functional Endpoint 1");
    }

    public ServerResponse returnParamsMap(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(request.params());
    }

    public ServerResponse callWikipediaApi(ServerRequest request) {
        RestTemplate restTemplate = new RestTemplate();

        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(restTemplate.getForEntity(
                        "https://en.wikipedia.org/api/rest_v1/page/title/Vietnam",
                        JsonNode.class)
                );
    }

}
