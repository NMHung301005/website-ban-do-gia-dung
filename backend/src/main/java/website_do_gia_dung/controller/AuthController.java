package website_do_gia_dung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import website_do_gia_dung.dto.AuthRequest;
import website_do_gia_dung.dto.RegisterRequest;
import website_do_gia_dung.entity.User;
import website_do_gia_dung.security.JwtService;
import website_do_gia_dung.service.AuthService;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest request) {

        User user = authService.login(request);
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }
}