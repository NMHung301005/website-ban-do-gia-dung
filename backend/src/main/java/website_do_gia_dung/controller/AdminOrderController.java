package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Order;
import website_do_gia_dung.repository.OrderRepository;
import website_do_gia_dung.security.JwtService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderRepository orderRepository;
    private final JwtService jwtService;

    private void checkAdmin(String token) {
        String role = jwtService.extractRole(token.substring(7));
        if (!role.equals("ADMIN")) {
            throw new RuntimeException("Không có quyền");
        }
    }

    // 📋 Xem tất cả đơn
    @GetMapping
    public List<Order> getAll(@RequestHeader("Authorization") String token) {
        checkAdmin(token);
        return orderRepository.findAll();
    }

    // 🔄 Update trạng thái
    @PutMapping("/{id}")
    public Order updateStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestParam String status) {

        checkAdmin(token);

        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);

        return orderRepository.save(order);
    }
}
