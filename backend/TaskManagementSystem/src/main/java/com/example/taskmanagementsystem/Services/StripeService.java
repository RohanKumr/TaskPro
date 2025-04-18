package com.example.taskmanagementsystem.Services;
import com.example.taskmanagementsystem.DTO.ProductRequest;
import com.example.taskmanagementsystem.DTO.StripeResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Optional;

@Service
public class StripeService {

    @Value("${stripe.secretKey}")
    private String secretKey;

    public StripeResponse checkoutProducts(ProductRequest request) {
      Stripe.apiKey = secretKey;
  
      try {
          long amountInCents = Optional.ofNullable(request.getAmount())
                                       .map(BigDecimal::valueOf)
                                       .orElse(BigDecimal.ZERO)
                                       .multiply(BigDecimal.valueOf(100))
                                       .longValue();
  
          SessionCreateParams params = SessionCreateParams.builder()
              .setMode(SessionCreateParams.Mode.PAYMENT)
              .setSuccessUrl(request.getSuccessUrl())
              .setCancelUrl(request.getCancelUrl())
              .addLineItem(
                  SessionCreateParams.LineItem.builder()
                  .setQuantity(request.getQuantity().longValue())
                      .setPriceData(
                          SessionCreateParams.LineItem.PriceData.builder()
                              .setCurrency(Optional.ofNullable(request.getCurrency())
                                                   .map(String::toLowerCase)
                                                   .orElse("usd"))
                              .setUnitAmount(amountInCents)
                              .setProductData(
                                  SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                      .setName(request.getName())
                                      .build()
                              )
                              .build()
                      )
                      .build()
              )
              .build();
  
          Session session = Session.create(params);
  
          return new StripeResponse(
              "SUCCESS",
              "Payment session created",
              session.getId(),
              session.getUrl()
          );
  
      } catch (StripeException e) {
          return new StripeResponse(
              "FAILED",
              "Stripe error: " + e.getMessage(),
              null,
              null
          );
      }
  }
  
  }
