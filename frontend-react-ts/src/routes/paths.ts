// O objeto PATH_PUBLIC é definido. Este objeto representa os caminhos das rotas públicas na aplicação.
// Ele tem cinco propriedades: home, register, login, unathorized e notFound. Todas são strings que representam os caminhos das rotas.
export const PATH_PUBLIC = {
  home: "/",
  register: "/register",
  login: "/login",
  unathorized: "/unathorized",
  notFound: "/404",
};

// O objeto PATH_DASHBOARD é definido. Este objeto representa os caminhos das rotas do painel de controle na aplicação.
// Ele tem dez propriedades: dashboard, userManagement, updateRole, sendMessage, inbox, allMessages, systemLogs, myLogs, owner, admin, manager e user.
// Todas são strings que representam os caminhos das rotas.
// A propriedade updateRole é um caminho parametrizado, onde :userName é um parâmetro que pode ser substituído pelo nome de usuário.
export const PATH_DASHBOARD = {
  dashboard: "/dashboard",
  userManagement: "/dashboard/user-management",
  updateRole: "/dashboard/update-role/:userName",
  sendMessage: "/dashboard/send-message",
  inbox: "/dashboard/inbox",
  allMessages: "/dashboard/all-messages",
  systemLogs: "/dashboard/system-logs",
  myLogs: "/dashboard/my-logs",
  owner: "/dashboard/owner",
  admin: "/dashboard/admin",
  manager: "/dashboard/manager",
  user: "/dashboard/user",
};