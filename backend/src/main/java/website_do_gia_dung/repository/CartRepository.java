package website_do_gia_dung.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.Cart;
import website_do_gia_dung.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);
}
