package website_do_gia_dung.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import website_do_gia_dung.entity.*;
import website_do_gia_dung.repository.CartRepository;
import website_do_gia_dung.repository.OrderRepository;
import website_do_gia_dung.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public Order checkout(String email) {

        // 1. Lấy user
        User user = userRepository.findByEmail(email).orElseThrow();

        // 2. Lấy cart
        Cart cart = cartRepository.findByUser(user);

        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống");
        }

        // 3. Tạo order
        Order order = Order.builder()
                .user(user)
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();

        double total = 0;

        // 4. Copy item
        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .build();

            total += orderItem.getPrice() * orderItem.getQuantity();
            order.getItems().add(orderItem);
        }

        order.setTotalPrice(total);

        // 5. Lưu order
        Order savedOrder = orderRepository.save(order);

        // 6. Xóa cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }
}
