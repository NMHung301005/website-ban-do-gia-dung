package website_do_gia_dung.service;

import lombok.RequiredArgsConstructor;
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

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
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
