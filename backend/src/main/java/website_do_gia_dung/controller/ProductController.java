package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping("/search")
    public List<Product> getByName(@RequestParam String name) {
        return productService.getByName(name);
    }
}
