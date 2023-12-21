namespace backend_dotnet.Core.Dtos.Message
{
    public class CreateMessageDto
    {
        public string ReceiverUsername { get; set; }
        public string Text { get; set; }
    }
}
