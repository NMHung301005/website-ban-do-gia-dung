package website_do_gia_dung.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import website_do_gia_dung.entity.Cart;
import website_do_gia_dung.entity.CartItem;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.entity.User;
import website_do_gia_dung.repository.CartItemRepository;
import website_do_gia_dung.repository.CartRepository;
import website_do_gia_dung.repository.ProductRepository;
import website_do_gia_dung.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 🛒 Lấy giỏ hàng của user
    public Cart getCart(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            cart = Cart.builder().user(user).build();
            cartRepository.save(cart);
        }

        return cart;
    }

    // ➕ Thêm vào giỏ
    public Cart addToCart(String email, Long productId) {

        Cart cart = getCart(email);
        Product product = productRepository.findById(productId).orElseThrow();

        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + 1);
                return cartRepository.save(cart);
            }
        }

        CartItem newItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(1)
                .build();

        cart.getItems().add(newItem);
        return cartRepository.save(cart);
    }

    // ❌ Xóa item
    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }
    // 🔄 Cập nhật số lượng
    public Cart updateQuantity(String email, Long itemId, int quantity) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Cart cart = cartRepository.findByUser(user);

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow();

        // ✅ Check item thuộc cart này
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Không có quyền");
        }

        if (quantity == 0) {
            cartItemRepository.delete(item);
            return getCart(email);
        }

        item.setQuantity(quantity);
        cartItemRepository.save(item);

        return getCart(email);
    }
    public double getTotal(Cart cart) {
        return cart.getItems().stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();
    }
}
