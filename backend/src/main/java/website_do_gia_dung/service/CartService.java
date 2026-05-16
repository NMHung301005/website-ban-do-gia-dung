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

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart getCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + email));
        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .items(new ArrayList<>())
                    .build();
            cartRepository.save(cart);
        }

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        return cart;
    }

    public Cart addToCart(String email, Long productId) {
        Cart cart = getCart(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm id=" + productId));

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

    // FIX: kiểm tra quyền sở hữu trước khi xóa
    public Cart removeItem(String email, Long itemId) {
        Cart cart = getCart(email);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy item id=" + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Bạn không có quyền xóa item này");
        }

        cartItemRepository.delete(item);
        return getCart(email);
    }

    public Cart updateQuantity(String email, Long itemId, int quantity) {
        Cart cart = getCart(email);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy item id=" + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Không có quyền chỉnh sửa item này");
        }

        if (quantity <= 0) {
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
