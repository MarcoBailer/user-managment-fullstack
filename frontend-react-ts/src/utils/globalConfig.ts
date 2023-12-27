// Importa as constantes PATH_DASHBOARD e PATH_PUBLIC do módulo "../routes/paths".
// Essas constantes representam os caminhos para as páginas do painel e públicas, respectivamente.
import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

// A constante HOST_API_KEY é a URL base para todas as solicitações de API que serão feitas.
// Neste caso, o servidor está rodando localmente na porta 7237.
export const HOST_API_KEY = 'https://localhost:7253/api';

// As constantes a seguir são os caminhos específicos para várias funcionalidades da API.
// Cada uma dessas constantes será anexada à HOST_API_KEY para formar a URL completa para a solicitação de API.

// REGISTER_URL é o caminho para a funcionalidade de registro de usuário na API.
export const REGISTER_URL = '/Auth/register';

// LOGIN_URL é o caminho para a funcionalidade de login de usuário na API.
export const LOGIN_URL = '/Auth/login';

// ME_URL é o caminho para a funcionalidade que retorna os detalhes do usuário atualmente logado.
export const ME_URL = '/Auth/me';

// USERS_LIST_URL é o caminho para a funcionalidade que retorna uma lista de todos os usuários.
export const USERS_LIST_URL = '/Auth/users';

// UPDATE_ROLE_URL é o caminho para a funcionalidade que atualiza a função de um usuário.
export const UPDATE_ROLE_URL = '/Auth/update-role';

// USERNAMES_LIST_URL é o caminho para a funcionalidade que retorna uma lista de todos os nomes de usuário.
export const USERNAMES_LIST_URL = '/Auth/usernames';

// ALL_MESSAGES_URL é o caminho para a funcionalidade que retorna todas as mensagens.
export const ALL_MESSAGES_URL = '/Messages';

// CREATE_MESSAGE_URL é o caminho para a funcionalidade que cria uma nova mensagem.
export const CREATE_MESSAGE_URL = '/Messages/create';

// MY_MESSAGES_URL é o caminho para a funcionalidade que retorna todas as mensagens do usuário atualmente logado.
export const MY_MESSAGES_URL = '/Messages/mine';

// LOGS_URL é o caminho para a funcionalidade que retorna todos os logs.
export const LOGS_URL = '/Logs';

// MY_LOGS_URL é o caminho para a funcionalidade que retorna todos os logs do usuário atualmente logado.
export const MY_LOGS_URL = '/Logs/mine';

// As constantes a seguir são os caminhos que o usuário será redirecionado após várias ações.

// PATH_AFTER_REGISTER é o caminho que o usuário será redirecionado após o registro.
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;

// PATH_AFTER_LOGIN é o caminho que o usuário será redirecionado após o login.
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;

// PATH_AFTER_LOGOUT é o caminho que o usuário será redirecionado após o logout.
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;