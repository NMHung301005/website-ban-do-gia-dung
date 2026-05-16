package website_do_gia_dung.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import website_do_gia_dung.entity.*;
import website_do_gia_dung.repository.CartRepository;
import website_do_gia_dung.repository.OrderRepository;
import website_do_gia_dung.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Order checkout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + email));

        Cart cart = cartRepository.findByUser(user);

        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống, không thể đặt hàng");
        }

        Order order = Order.builder()
                .user(user)
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();

        double total = 0;

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice()) // lưu giá tại thời điểm mua
                    .build();

            total += orderItem.getPrice() * orderItem.getQuantity();
            order.getItems().add(orderItem);
        }

        order.setTotalPrice(total);
        Order savedOrder = orderRepository.save(order);

        // Xóa giỏ hàng sau khi đặt thành công
        cart.getItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }

    public List<Order> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + email));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }
}
