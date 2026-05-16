package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.dto.AuthRequest;
import website_do_gia_dung.dto.RegisterRequest;
import website_do_gia_dung.dto.UserResponse;
import website_do_gia_dung.entity.User;
import website_do_gia_dung.security.JwtService;
import website_do_gia_dung.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest request) {
        User user = authService.login(request);
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return Map.of(
                "token", token,
                "email", user.getEmail(),
                "role", user.getRole().name(),
                "username", user.getUsername()
        );
    }
}
