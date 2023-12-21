using backend_dotnet.Core.Constants;
using backend_dotnet.Core.Dtos.Auth;
using backend_dotnet.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedResult = await _authService.SeedRolesAsync();
            return StatusCode(seedResult.StatusCode, seedResult.Message);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult = await _authService.RegisterAsync(registerDto);
            return StatusCode(registerResult.StatusCode, registerResult.Message);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);

            if(loginResult is null)
            {
                return Unauthorized("Did not found your credentials");
            }

            return Ok(loginResult);
        }

        [HttpPost]
        [Route("update-role")]
        [Authorize(Roles = StaticUserRoles.OwnerAdmin)]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await _authService.UpdateRoleAsync(User,updateRoleDto);
            if (updateRoleResult.IsSucceded)
            {
                return Ok(updateRoleResult.Message);
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode, updateRoleResult.Message);
            }
        }
        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody] MeDto meDto)
        {
            try
            {
                var me = await _authService.MeAsync(meDto);
                if(me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("Invalid Token");
                }
            }
            catch (Exception)
            {
                return Unauthorized("Invalid Token");
            }
        }
        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserInfoResult>>> GetUsersList()
        {
            var users = await _authService.GetUsersListAsync();
            return Ok(users);
        }
        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserInfoResult>> GetUserDetailsByUserName([FromBody] string userName)
        {
            var user = await _authService.GetUserDetailsByUserNameAsync(userName);
            if(user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("User not found");
            }
        }
        [HttpGet]
        [Route("usernames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUsernamesList()
        {
            var usernames = await _authService.GetUsernamesListAsync();
            return Ok(usernames);
        }
    }
}
