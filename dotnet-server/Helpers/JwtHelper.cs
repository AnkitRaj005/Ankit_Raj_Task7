using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtHelper
{
  private readonly string _jwtSecret;

  public JwtHelper(IConfiguration config)
  {
    _jwtSecret = config["Jwt:Secret"] ?? throw new Exception("JWT Secret not found in config");
  }

  public string GenerateJwtToken(User user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_jwtSecret);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id ?? string.Empty),
        new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
            }),
      Expires = DateTime.UtcNow.AddHours(1),
      SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature
        )
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }
}
