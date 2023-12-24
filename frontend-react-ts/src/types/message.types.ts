// A interface ISendMessageDto é definida. Esta interface representa o formato dos dados necessários para enviar uma mensagem.
// Ela tem duas propriedades: receiverUserName e text. Ambas são strings.
export interface ISendMessageDto {
  receiverUserName: string;
  text: string;
}

// A interface IMessageDto é definida. Esta interface estende a interface ISendMessageDto, o que significa que ela herda todas as suas propriedades.
// Além das propriedades herdadas, ela tem três propriedades adicionais: id, senderUserName e createdAt. Todas são strings, exceto id que é um número.
export interface IMessageDto extends ISendMessageDto {
  id: number;
  senderUserName: string;
  createdAt: string;
}