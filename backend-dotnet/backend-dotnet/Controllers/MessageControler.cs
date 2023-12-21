using backend_dotnet.Core.Constants;
using backend_dotnet.Core.Dtos.Message;
using backend_dotnet.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageControler : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageControler(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        [Route("Create")]
        [Authorize]

        public async Task<IActionResult> CreateNewMessage([FromBody] CreateMessageDto createMessageDto)
        {
            var result = await _messageService.CreateNewMessageAsync(User, createMessageDto);
            if(result.IsSucceded)
            {
                return Ok(result);
            }

            return StatusCode(result.StatusCode, result.Message);
        }

        [HttpGet]
        [Route("mine")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMyMessages()
        {
            var messages = await _messageService.GetMyMessagesAsync(User);
            return Ok(messages);
        }

        [HttpGet]
        [Authorize(Roles = StaticUserRoles.OwnerAdmin)]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMessages()
        {
            var messages = await _messageService.GetMessageAsync();
            return Ok(messages);
        }
    }
}
