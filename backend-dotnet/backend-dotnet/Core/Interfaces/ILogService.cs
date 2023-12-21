using backend_dotnet.Core.Dtos.Log;
using System.Security.Claims;

namespace backend_dotnet.Core.Interfaces
{
    public interface ILogService
    {
        Task SaveNewLog(string userName, string description);
        Task<IEnumerable<GetLogDto>> GetLogsAsync();
        Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal user);
    }
}
