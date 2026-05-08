package website_do_gia_dung.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import website_do_gia_dung.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByNameContaining(String keyword);
}
