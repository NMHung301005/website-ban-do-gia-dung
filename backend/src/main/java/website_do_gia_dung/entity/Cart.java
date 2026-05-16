package website_do_gia_dung.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    // FIX: fetch EAGER để tránh LazyInitializationException
    // FIX: orphanRemoval = true để xóa item khi remove khỏi list
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL,
            fetch = FetchType.EAGER, orphanRemoval = true)
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();
}