package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    // GET /api/v1/admin/orders
    // → Tất cả đơn hàng (giữ lại cũ)
    @GetMapping
    public List<Order> getAll(@RequestHeader("Authorization") String token) {
        checkAdmin(token);
        return orderRepository.findAll(Sort.by("createdAt").descending());
    }

    // GET /api/v1/admin/orders/paged?page=0&size=10&status=PENDING
    // → Phân trang + filter theo trạng thái (status để trống = tất cả)
    @GetMapping("/paged")
    public Page<Order> getAllPaged(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false)    String status) {

        checkAdmin(token);

        Pageable pageable = PageRequest.of(page, size,
                Sort.by("createdAt").descending());

        if (status != null && !status.isBlank()) {
            return orderRepository.findByStatus(status, pageable);
        }
        return orderRepository.findAll(pageable);
    }

    // PUT /api/v1/admin/orders/{id}?status=CONFIRMED
    @PutMapping("/{id}")
    public Order updateStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestParam String status) {

        checkAdmin(token);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng id=" + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
