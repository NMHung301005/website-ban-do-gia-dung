package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.security.JwtService;
import website_do_gia_dung.service.ProductService;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final ProductService productService;
    private final JwtService jwtService;

    private void checkAdmin(String token) {
        String role = jwtService.extractRole(token.substring(7));
        if (!role.equals("ADMIN")) {
            throw new RuntimeException("Không có quyền ADMIN");
        }
    }

    // ➕ Thêm sản phẩm
    @PostMapping
    public Product create(
            @RequestHeader("Authorization") String token,
            @RequestBody Product product) {

        checkAdmin(token);
        return productService.create(product);
    }

    // ✏️ Update
    @PutMapping("/{id}")
    public Product update(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody Product product) {

        checkAdmin(token);
        product.setId(id);
        return productService.create(product);
    }

    // ❌ Delete
    @DeleteMapping("/{id}")
    public void delete(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        checkAdmin(token);
        productService.delete(id);
    }
}
