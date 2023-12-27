// A interface IRegisterDto é definida. Esta interface representa o formato dos dados necessários para registrar um novo usuário.
// Ela tem seis propriedades: firstName, lastName, userName, email, password e address. Todas são strings.
export interface IRegisterDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  address: string;
}

// A interface ILoginDto é definida. Esta interface representa o formato dos dados necessários para fazer login.
// Ela tem duas propriedades: userName e password. Ambas são strings.
export interface ILoginDto {
  userName: string;
  password: string;
}

// A interface IUpdateRoleDto é definida. Esta interface representa o formato dos dados necessários para atualizar o papel de um usuário.
// Ela tem duas propriedades: userName e newRole. Ambas são strings.
export interface IUpdateRoleDto {
  userName: string;
  newRole: string;
}

// A interface IAuthUser é definida. Esta interface representa um usuário autenticado.
// Ela tem sete propriedades: id, firstName, lastName, userName, email, createdAt e roles.
// id, firstName, lastName, userName, email e createdAt são strings.
// roles é um array de strings.
export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: string;
  roles: string[];
}

// A interface ILoginResponseDto é definida. Esta interface representa a resposta de uma solicitação de login.
// Ela tem duas propriedades: newToken e userInfo.
// newToken é uma string que representa o token de autenticação do usuário.
// userInfo é um objeto do tipo IAuthUser que representa o usuário autenticado.
export interface ILoginResponseDto {
  newToken: string;
  userInfo: IAuthUser;
}

// A interface IAuthContextState é definida. Esta interface representa o estado do contexto de autenticação.
// Ela tem três propriedades: isAuthenticated, isAuthLoading e user.
// isAuthenticated é um booleano que indica se o usuário está autenticado ou não.
// isAuthLoading é um booleano que indica se a autenticação está sendo carregada ou não.
// user é um objeto do tipo IAuthUser que representa o usuário autenticado. Esta propriedade é opcional.
export interface IAuthContextState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
}

// O enum IAuthContextActionTypes é definido. Este enum representa os tipos de ações que podem ser disparadas no contexto de autenticação.
// Ele tem três valores: INITIAL, LOGIN e LOGOUT.
export enum IAuthContextActionTypes {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

// A interface IAuthContexAction é definida. Esta interface representa uma ação que pode ser disparada no contexto de autenticação.
// Ela tem duas propriedades: type e payload.
// type é do tipo IAuthContextActionTypes e representa o tipo da ação.
// payload é um objeto do tipo IAuthUser que representa o usuário autenticado. Esta propriedade é opcional.
export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IAuthUser;
}

// A interface IAuthContext é definida. Esta interface representa o contexto de autenticação.
// Ela tem cinco propriedades: isAuthenticated, isAuthLoading, user, login, register e logout.
// isAuthenticated, isAuthLoading e user são as mesmas propriedades definidas em IAuthContextState.
// login é uma função que recebe um nome de usuário e uma senha e retorna uma promessa. Esta função é usada para autenticar o usuário.
// register é uma função que recebe vários parâmetros e retorna uma promessa. Esta função é usada para registrar um novo usuário.
// logout é uma função que não recebe parâmetros e não retorna nada. Esta função é usada para desautenticar o usuário.
export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    address: string
  ) => Promise<void>;
  logout: () => void;
}

// O enum RolesEnum é definido. Este enum representa os possíveis papéis que um usuário pode ter.
// Ele tem quatro valores: OWNER, ADMIN, MANAGER e USER.
export enum RolesEnum {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}