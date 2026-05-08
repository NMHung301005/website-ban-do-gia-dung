package website_do_gia_dung.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Order;
import website_do_gia_dung.security.JwtService;
import website_do_gia_dung.service.OrderService;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final JwtService jwtService;

    // 🧾 Checkout
    @PostMapping("/checkout")
    public Order checkout(@RequestHeader("Authorization") String token) {

        String email = jwtService.extractEmail(token.substring(7));
        return orderService.checkout(email);
    }
}
