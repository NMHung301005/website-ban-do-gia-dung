package website_do_gia_dung.dto;
import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
