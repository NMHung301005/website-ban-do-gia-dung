package website_do_gia_dung.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
