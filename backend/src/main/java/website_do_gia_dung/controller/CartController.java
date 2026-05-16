package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.entity.Cart;
import website_do_gia_dung.service.CartService;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 🛒 Xem giỏ hàng
    @GetMapping
    public Cart getCart(Authentication authentication) {
        return cartService.getCart(authentication.getName());
    }

    // ➕ Thêm sản phẩm
    @PostMapping("/add/{productId}")
    public Cart addToCart(@PathVariable Long productId,
                          Authentication authentication) {
        return cartService.addToCart(authentication.getName(), productId);
    }

    // ❌ Xóa item — có kiểm tra quyền sở hữu
    @DeleteMapping("/{itemId}")
    public Cart removeItem(@PathVariable Long itemId,
                           Authentication authentication) {
        return cartService.removeItem(authentication.getName(), itemId);
    }

    // 🔄 Update quantity
    @PutMapping("/update/{itemId}")
    public Cart updateQuantity(@PathVariable Long itemId,
                               @RequestParam int quantity,
                               Authentication authentication) {
        return cartService.updateQuantity(authentication.getName(), itemId, quantity);
    }
}
