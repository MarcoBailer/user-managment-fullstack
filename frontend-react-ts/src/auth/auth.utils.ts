import { IAuthUser, RolesEnum } from "../types/auth.types";
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem("accessToken");
};

// Definindo as constantes que representam os diferentes papéis de acesso
export const allAccessRoles = [
  RolesEnum.OWNER,
  RolesEnum.ADMIN,
  RolesEnum.MANAGER,
  RolesEnum.USER,
];
export const managerAccessRoles = [
  RolesEnum.OWNER,
  RolesEnum.ADMIN,
  RolesEnum.MANAGER,
];
export const adminAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN];
export const ownerAccessRoles = [RolesEnum.OWNER];

// Definindo a função allowedRolesForUpdateArray que retorna os papéis que o usuário logado pode atualizar
export const allowedRolesForUpdateArray = (
  loggedInUser?: IAuthUser
): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.OWNER)
    ? [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER]
    : [RolesEnum.MANAGER, RolesEnum.USER];
};

//owner cannot change owner role
//admin cannot change owner role neither admin role

// Definindo a função isAuthorizedForUpdateRole que verifica se o usuário logado tem permissão para atualizar o papel do usuário selecionado
export const isAuthorizedForUpdateRole = (
  loggedInUserRole: string,
  selectedUserRole: string
) => {
  let result = true;
  if (
    loggedInUserRole === RolesEnum.OWNER &&
    selectedUserRole === RolesEnum.OWNER
  ) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.OWNER ||
      selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  }
  return result;
};

// Este arquivo define várias constantes e funções relacionadas à autorização de usuários com base em seus papéis.
//  A função allowedRolesForUpdateArray retorna os papéis que o usuário logado pode atualizar, enquanto a função isAuthorizedForUpdateRole 
//  verifica se o usuário logado tem permissão para atualizar o papel do usuário selecionado.
//  As constantes allAccessRoles, adminAccessRoles e ownerAccessRoles definem os papéis que têm acesso a diferentes níveis de autorização.