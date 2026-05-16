package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }
    // GET /api/v1/products/paged?page=0&size=6&sortBy=price
    // → Phân trang, mặc định trang 0, mỗi trang 6 sản phẩm, sắp xếp theo tên
    @GetMapping("/paged")
    public Page<Product> getAllPaged(
            @RequestParam(defaultValue = "0")    int page,
            @RequestParam(defaultValue = "6")    int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return productService.getAllPaged(page, size, sortBy);
    }

    // GET /api/v1/products/filter?minPrice=100000&maxPrice=500000&page=0&size=6
    // → Lọc theo khoảng giá + phân trang
    @GetMapping("/filter")
    public Page<Product> filterByPrice(
            @RequestParam(defaultValue = "0")         double minPrice,
            @RequestParam(defaultValue = "999999999") double maxPrice,
            @RequestParam(defaultValue = "0")         int page,
            @RequestParam(defaultValue = "6")         int size) {
        return productService.filterByPrice(minPrice, maxPrice, page, size);
    }

    // GET /api/v1/products/search?name=noi&minPrice=100000&maxPrice=500000&page=0&size=6
    // → Tìm kiếm tổng hợp: tên + lọc giá + phân trang (dùng cái này cho frontend)
    @GetMapping("/search")
    public Page<Product> search(
            @RequestParam(required = false)           String name,
            @RequestParam(required = false)           Double minPrice,
            @RequestParam(required = false)           Double maxPrice,
            @RequestParam(defaultValue = "0")         int page,
            @RequestParam(defaultValue = "6")         int size) {
        return productService.search(name, minPrice, maxPrice, page, size);
    }

    // GET /api/v1/products/{id}
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getById(id);
    }
}
