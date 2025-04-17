// package com.example.taskmanagementsystem.Controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.example.taskmanagementsystem.Services.PaymentService;

// @RestController
// @RequestMapping("/api/payment")
// public class PaymentController {

//     @Autowired
//     private PaymentService paymentService;

//     @GetMapping("/checkout")
//     public ResponseEntity<String> checkout() throws Exception {
//         String checkoutUrl = paymentService.createCheckoutSession();
//         return ResponseEntity.ok(checkoutUrl);
//     }
// }
