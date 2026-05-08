package website_do_gia_dung.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
