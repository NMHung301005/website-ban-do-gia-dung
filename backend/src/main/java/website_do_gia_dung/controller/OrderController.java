package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Order;
import website_do_gia_dung.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 🧾 Checkout
    @PostMapping("/checkout")
    public Order checkout(Authentication authentication) {
        return orderService.checkout(authentication.getName());
    }

    // 📋 Xem lịch sử đơn hàng của user hiện tại
    @GetMapping
    public List<Order> getMyOrders(Authentication authentication) {
        return orderService.getOrdersByUser(authentication.getName());
    }
}
