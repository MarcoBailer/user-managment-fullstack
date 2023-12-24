import {
  createContext,
  useReducer,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import {
  IAuthContext,
  IAuthContexAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.types";
import { getSession, setSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
} from "../utils/globalConfig";

// we need a reducer fuction for userReducer hook

const authReducer = (state: IAuthContextState, action: IAuthContexAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: undefined,
    };
  }
  return state;
};

// initial state for useReducer hook

const initialState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

export const AuthContext = createContext<IAuthContext | null>(null);

//interface for context props

interface IProps {
  children: ReactNode;
}

// create a componet to manage all auth

const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  //initialize Method

  const initializeAuthContext = useCallback(async () => {
    try {
      //validate accessToken by calling backend
      const token = getSession();
      if (token) {
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        //In response, we receive jwt and user data
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  // In start of application, we call initializeAuthContext to be sure about authentication status
  useEffect(() => {
    initializeAuthContext()
      .then(() => console.log("initializeAuthContext was successfull"))
      .catch((error) => console.log(error));
  }, []);
  //register method
  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      address: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        email,
        password,
        address,
      });
      console.log("Register result", response);
      toast.success("Register was successfull.Please login");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );
  //login method
  const login = useCallback(async (userName: string, password: string) => {
    const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success("Login was successfull");
    //In response, we receive jwt and user data
    const { newToken, userInfo } = response.data;
    setSession(newToken);
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userInfo,
    });
    navigate(PATH_AFTER_LOGIN);
  }, []);
  //logout method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, []);
  //create an object for values of context provider
  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;


// Este é um arquivo auth.context.tsx que define um contexto de autenticação para um aplicativo React. 
//Ele usa o hook useReducer para gerenciar o estado de autenticação e fornece funções para login, logout e registro :

//1 Importa os módulos necessários e tipos de auth.types.

//2 Define uma função authReducer que manipula ações de LOGIN e LOGOUT.

//3 Define um estado inicial para o hook useReducer.

//4 Cria o AuthContext usando createContext.

//5 Define uma interface IProps para os props do componente AuthContextProvider.

//6 Define o componente AuthContextProvider que usa useReducer para gerenciar o estado de autenticação.

//7 Dentro do AuthContextProvider, define uma função initializeAuthContext que verifica se o usuário está autenticado no início.

//8 Usa o hook useEffect para chamar initializeAuthContext quando o componente é montado.

//9 Define funções register, login e logout que fazem chamadas de API para registrar, fazer login e logout, respectivamente.

//10 Define um objeto valuesObject que contém o estado de autenticação e as funções de autenticação.

//11 Retorna um AuthContext.Provider que passa valuesObject como o valor do contexto.

//12 Exporta AuthContextProvider como o export padrão.