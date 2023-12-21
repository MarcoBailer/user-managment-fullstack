using backend_dotnet.Core.Constants;
using backend_dotnet.Core.Dtos.Auth;
using backend_dotnet.Core.Dtos.General;
using backend_dotnet.Core.Entities;
using backend_dotnet.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend_dotnet.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogService _logService;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logService = logService;
            _configuration = configuration;
        }

        public async Task<GeneralServiceResponseDto> SeedRolesAsync()
        {
            bool isOwnerRoleExist = await _roleManager.RoleExistsAsync(StaticUserRoles.OWNER);
            bool isAdminRoleExist = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isManagerRoleExist = await _roleManager.RoleExistsAsync(StaticUserRoles.MANAGER);
            bool isUserRoleExist = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);

            if(isOwnerRoleExist && isAdminRoleExist && isManagerRoleExist && isUserRoleExist)
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = true,
                    StatusCode = 200,
                    Message =  "Roles are already seeded"
                };
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.OWNER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.MANAGER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.USER));

            return new GeneralServiceResponseDto()
            {
                IsSucceded = true,
                StatusCode = 200,
                Message = "Roles are seeded successfully"
            };
        }

        public async Task<GeneralServiceResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isExistUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if(isExistUser is not null)
            {
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = false,
                    StatusCode = 409,
                    Message = "User already exist"
                };
            }
            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Address = registerDto.Address,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!createUserResult.Succeeded)
            {
                var errorString = "User creation failed: ";
                foreach (var error in createUserResult.Errors)
                {
                    errorString += error.Description + " ";
                }
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = false,
                    StatusCode = 400,
                    Message = errorString
                };
            }
            //Add default role to user 

            await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);
            await _logService.SaveNewLog(newUser.UserName, "Registered into Web");

            return new GeneralServiceResponseDto()
            {
                IsSucceded = true,
                StatusCode = 201,
                Message = "User created successfully"
            };
        }

        public async Task<LoginServiceResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user is null)
                return null;

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if(!isPasswordValid)
                return null;
            var newToken = await GenerateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo =  GenerateUserInfoObject(user,roles);
            await _logService.SaveNewLog(user.UserName, "New Login");

            return new LoginServiceResponseDto()
            {
                Token = newToken,
                UserInfo = userInfo
            };
        }

        public async Task<GeneralServiceResponseDto> UpdateRoleAsync(ClaimsPrincipal user, UpdateRoleDto updateRoleDto)
        {
            var checkUser = await _userManager.FindByNameAsync(updateRoleDto.UserName);
            if(checkUser is null)
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = false,
                    StatusCode = 404,
                    Message = "User not found"
                };
            var userRole = await _userManager.GetRolesAsync(checkUser);
            //Just owner and admin can update role
            if (user.IsInRole(StaticUserRoles.ADMIN))
            {
                //user is admin
                if(updateRoleDto.NewRole == RoleType.USER || updateRoleDto.NewRole == RoleType.MANAGER)
                {
                    //admin can change the of every one except owner and admin
                    if(userRole.Any(x => x.Equals(StaticUserRoles.OWNER) || x.Equals(StaticUserRoles.ADMIN)))
                    {
                        return new GeneralServiceResponseDto()
                        {
                            IsSucceded = false,
                            StatusCode = 404,
                            Message = "You can't update the role of this user"
                        };
                    }
                    else
                    {
                        await _userManager.RemoveFromRolesAsync(checkUser, userRole);
                        await _userManager.AddToRoleAsync(checkUser, updateRoleDto.NewRole.ToString());
                        await _logService.SaveNewLog(checkUser.UserName, "Role updated");
                        return new GeneralServiceResponseDto()
                        {
                            IsSucceded = true,
                            StatusCode = 200,
                            Message = "Role updated successfully"
                        };
                    }
                }
                else
                    return new GeneralServiceResponseDto()
                    {
                        IsSucceded = false,
                        StatusCode = 404,
                        Message = "You are not allowed to change roles"
                    };
            }
            else
            {
                //user is owner
                if(userRole.Any(x => x.Equals(StaticUserRoles.OWNER)))
                {
                    return new GeneralServiceResponseDto()
                    {
                        IsSucceded = false,
                        StatusCode = 404,
                        Message = "You can't update the role of this user"
                    };
                }
                else
                {
                    await _userManager.RemoveFromRolesAsync(checkUser, userRole);
                    await _userManager.AddToRoleAsync(checkUser, updateRoleDto.NewRole.ToString());
                    await _logService.SaveNewLog(checkUser.UserName, "Role updated");
                }
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = true,
                    StatusCode = 200,
                    Message = "Role updated successfully"
                };
            }
        }

        public async Task<LoginServiceResponseDto?> MeAsync(MeDto meDto)
        {
            ClaimsPrincipal handler = new JwtSecurityTokenHandler().ValidateToken(meDto.Token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                ValidAudience = _configuration["JWT:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]))
            }, out SecurityToken validatedToken);

            string decodedUserName = handler.Claims.First(x => x.Type == ClaimTypes.Name).Value;
            if (decodedUserName is null)
                return null;
            var user = await _userManager.FindByNameAsync(decodedUserName);
            if (user is null)
                return null;
                
            var newToken = await GenerateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            await _logService.SaveNewLog(user.UserName, "New Token Generated");

            return new LoginServiceResponseDto()
            {
                Token = newToken,
                UserInfo = userInfo
            };
        }

        public async Task<IEnumerable<UserInfoResult>> GetUsersListAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            List<UserInfoResult> userInfoResults = new List<UserInfoResult>();
            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userInfo = GenerateUserInfoObject(user, roles);
                userInfoResults.Add(userInfo);
            }

            return userInfoResults;
        }


        public async Task<UserInfoResult?> GetUserDetailsByUserNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if(user is null)
                return null;
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            return userInfo;
        }

        public async Task<IEnumerable<string>> GetUsernamesListAsync()
        {
            var users = await _userManager.Users.Select(x => x.UserName).ToListAsync();
            
            return users;
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("FirstName", user.FirstName),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSecretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSecretKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: signingCredentials
               );
            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenAsString;
        }
        private UserInfoResult GenerateUserInfoObject(ApplicationUser user, IEnumerable<string> roles)
        {
            return new UserInfoResult()
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Roles = roles
            };
        }
    }
}
