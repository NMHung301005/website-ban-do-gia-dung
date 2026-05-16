package website_do_gia_dung.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    // Lấy tất cả có phân trang
    // page bắt đầu từ 0, size = số sản phẩm mỗi trang, sortBy = tên field
    public Page<Product> getAllPaged(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        return productRepository.findAll(pageable);
    }

    // Lọc theo giá có phân trang
    public Page<Product> filterByPrice(double minPrice, double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        return productRepository.findByPriceBetween(minPrice, maxPrice, pageable);
    }

    // Tìm kiếm tổng hợp: tên + giá + phân trang
    public Page<Product> search(String name, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return productRepository.search(name, minPrice, maxPrice, pageable);
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm id=" + id));
    }

    public List<Product> getByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
