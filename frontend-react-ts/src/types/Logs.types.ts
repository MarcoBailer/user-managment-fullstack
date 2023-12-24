// A interface ILogDto é definida. Esta interface representa o formato dos dados de um log.
// Ela tem três propriedades: createdAt, userName e description. Todas são strings.
// createdAt é a data e hora em que o log foi criado.
// userName é o nome do usuário associado ao log.
// description é uma descrição do log.
export interface ILogDto {
  createdAt: string;
  userName: string;
  description: string;
}