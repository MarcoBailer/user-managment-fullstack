using System.ComponentModel.DataAnnotations;

namespace backend_dotnet.Core.Dtos.Auth
{
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required(ErrorMessage = "User Name required")]
        public string UserName { get; set; }
        public string Email { get; set; }
        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; }
        public string Address { get; set; }
    }
}
