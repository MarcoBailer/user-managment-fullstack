using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Core.Dtos.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "User Name required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; }
    }
}
