package com.example.taskmanagementsystem.Controllers;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanagementsystem.DTO.ProductRequest;
import com.example.taskmanagementsystem.DTO.StripeResponse;
import com.example.taskmanagementsystem.Services.StripeService;
 
@RestController
@CrossOrigin("*")
@RequestMapping("/product/v1")

public class ProductCheckoutController {
 
 
    private StripeService stripeService;
 
    public ProductCheckoutController(StripeService stripeService) {

        this.stripeService = stripeService;

    }
 
    @PostMapping("/checkout")

    public ResponseEntity<StripeResponse> checkoutProducts(@RequestBody ProductRequest productRequest) {

        StripeResponse stripeResponse = stripeService.checkoutProducts(productRequest);

        return ResponseEntity

                .status(HttpStatus.OK)

                .body(stripeResponse);

    }

}
 