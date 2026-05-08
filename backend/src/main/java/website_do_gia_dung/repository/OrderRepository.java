package website_do_gia_dung.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
