package website_do_gia_dung.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.Order;
import website_do_gia_dung.entity.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Đơn hàng của 1 user, mới nhất trước
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    // Lọc đơn theo trạng thái có phân trang (dùng cho admin)
    Page<Order> findByStatus(String status, Pageable pageable);
}
