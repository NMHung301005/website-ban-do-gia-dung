package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Cart;
import website_do_gia_dung.security.JwtService;
import website_do_gia_dung.service.CartService;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtService jwtService;

    // 🛒 Xem giỏ hàng
    @GetMapping
    public Cart getCart(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        return cartService.getCart(email);
    }

    // ➕ Thêm sản phẩm
    @PostMapping("/add/{productId}")
    public Cart addToCart(@RequestHeader("Authorization") String token,
                          @PathVariable Long productId) {

        String email = jwtService.extractEmail(token.substring(7));
        return cartService.addToCart(email, productId);
    }

    // ❌ Xóa item
    @DeleteMapping("/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
    }
    // 🔄 Update quantity
    @PutMapping("/update/{itemId}")
    public Cart updateQuantity(
            @RequestHeader("Authorization") String token,
            @PathVariable Long itemId,
            @RequestParam int quantity) {

        String email = jwtService.extractEmail(token.substring(7));
        return cartService.updateQuantity(email, itemId, quantity);
    }
}