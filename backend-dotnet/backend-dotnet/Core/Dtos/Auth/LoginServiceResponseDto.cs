namespace backend_dotnet.Core.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string Token { get; set; }

        //this would be returned to frontend

        public UserInfoResult UserInfo { get; set; }
    }
}
