package website_do_gia_dung.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import website_do_gia_dung.entity.Product;
import website_do_gia_dung.entity.Role;
import website_do_gia_dung.entity.User;
import website_do_gia_dung.repository.ProductRepository;
import website_do_gia_dung.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Tạo tài khoản admin mặc định nếu chưa có
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            User admin = User.builder()
                    .username("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Đã tạo tài khoản admin: admin@gmail.com / admin123");
        }

        // Tạo tài khoản user mặc định nếu chưa có
        if (userRepository.findByEmail("user@gmail.com").isEmpty()) {
            User user = User.builder()
                    .username("Nguyen Van A")
                    .email("user@gmail.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            System.out.println("✅ Đã tạo tài khoản user: user@gmail.com / user123");
        }

        // Tạo sản phẩm mẫu nếu chưa có
        if (productRepository.count() == 0) {
            productRepository.save(buildProduct("Nồi cơm điện Sunhouse 1.8L",
                    "Công suất 700W, nồi chống dính, bảo hành 12 tháng", 450000));
            productRepository.save(buildProduct("Máy xay sinh tố Philips HR2056",
                    "Công suất 450W, dung tích 1.5L, 2 tốc độ", 890000));
            productRepository.save(buildProduct("Bàn là hơi nước Panasonic NI-P300T",
                    "Công suất 2400W, bình chứa 300ml, tự ngắt an toàn", 650000));
            productRepository.save(buildProduct("Máy lọc nước RO Karofi 8 lõi",
                    "Lọc 8 cấp độ, công suất 15L/h, màn hình LCD", 3200000));
            productRepository.save(buildProduct("Quạt đứng Panasonic F-409KH",
                    "3 tốc độ, điều khiển từ xa, hẹn giờ 7.5h", 1150000));
            System.out.println("✅ Đã tạo 5 sản phẩm mẫu");
        }
    }

    private Product buildProduct(String name, String desc, double price) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        return p;
    }
}
