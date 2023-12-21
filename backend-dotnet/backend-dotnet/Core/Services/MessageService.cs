using backend_dotnet.Core.DbContext;
using backend_dotnet.Core.Dtos.General;
using backend_dotnet.Core.Dtos.Message;
using backend_dotnet.Core.Entities;
using backend_dotnet.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend_dotnet.Core.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogService _logService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MessageService(ApplicationDbContext context, ILogService logService, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _logService = logService;
            _userManager = userManager;
        }

        public async Task<GeneralServiceResponseDto> CreateNewMessageAsync(ClaimsPrincipal user, CreateMessageDto createMessageDto)
        {
            if(user.Identity.Name == createMessageDto.ReceiverUsername)
            {
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = false,
                    StatusCode = 400,
                    Message = "You can't send message to yourself"
                };
            }
            var isReceiverUserNameValid = _userManager.Users.Any(q => q.UserName == createMessageDto.ReceiverUsername);
            if (!isReceiverUserNameValid)
            {
                return new GeneralServiceResponseDto()
                {
                    IsSucceded = false,
                    StatusCode = 400,
                    Message = "Receiver username is not valid"
                };
            }
            Message newMessage = new Message()
            {
                SenderUserName = user.Identity.Name,
                ReceiverUserName = createMessageDto.ReceiverUsername,
                Text = createMessageDto.Text,
                CreatedAt = DateTime.Now
            };
            await _context.Messages.AddAsync(newMessage);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(user.Identity.Name, "Send Message");

            return new GeneralServiceResponseDto()
            {
                IsSucceded = true,
                StatusCode = 201,
                Message = "Message sent successfully"
            };
        }

        public async Task<IEnumerable<GetMessageDto>> GetMessageAsync()
        {
            var messages = await _context.Messages
                .Select(q => new GetMessageDto()
                {
                    Id = q.Id,
                    SenderUsername = q.SenderUserName,
                    ReceiverUsername = q.ReceiverUserName,
                    Text = q.Text,
                    CreatedAt = q.CreatedAt
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<GetMessageDto>> GetMyMessagesAsync(ClaimsPrincipal user)
        {
            var loggedInUser = user.Identity.Name;

            var messages = await _context.Messages
                .Where(q => q.SenderUserName == loggedInUser || q.ReceiverUserName == loggedInUser)
                .Select(q => new GetMessageDto()
                {
                    Id = q.Id,
                    SenderUsername = q.SenderUserName,
                    ReceiverUsername = q.ReceiverUserName,
                    Text = q.Text,
                    CreatedAt = q.CreatedAt
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return messages;
        }
    }
}
