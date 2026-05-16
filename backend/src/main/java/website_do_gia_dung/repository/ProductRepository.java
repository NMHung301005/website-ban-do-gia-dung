package website_do_gia_dung.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import website_do_gia_dung.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByNameContaining(String keyword);
    // Phân trang toàn bộ sản phẩm
    Page<Product> findAll(Pageable pageable);

    // Lọc theo khoảng giá + phân trang
    Page<Product> findByPriceBetween(double minPrice, double maxPrice, Pageable pageable);

    // Tìm theo tên + lọc giá + phân trang (kết hợp)
    @Query("SELECT p FROM Product p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> search(
            @Param("name")     String name,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}


