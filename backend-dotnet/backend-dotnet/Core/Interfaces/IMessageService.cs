﻿using backend_dotnet.Core.Dtos.General;
using backend_dotnet.Core.Dtos.Message;
using System.Security.Claims;

namespace backend_dotnet.Core.Interfaces
{
    public interface IMessageService
    {
        Task<GeneralServiceResponseDto> CreateNewMessageAsync(ClaimsPrincipal user, CreateMessageDto createMessageDto);
        Task<IEnumerable<GetMessageDto>> GetMessageAsync();
        Task<IEnumerable<GetMessageDto>> GetMyMessagesAsync(ClaimsPrincipal user);
    }
}
