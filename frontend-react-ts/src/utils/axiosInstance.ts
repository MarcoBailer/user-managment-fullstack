// A biblioteca axios é importada. Axios é uma biblioteca popular de cliente HTTP baseada em promessa para fazer solicitações HTTP.
import axios from "axios";

// A constante HOST_API_KEY é importada do módulo "./globalConfig". Esta é a URL base para todas as solicitações de API que serão feitas.
import { HOST_API_KEY } from "./globalConfig";

// Uma instância do axios é criada com a URL base definida como HOST_API_KEY. Todas as solicitações feitas usando esta instância terão HOST_API_KEY como URL base.
const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

// Interceptors de resposta são definidos para a instância do axios. Interceptors permitem que você altere a resposta antes de ela ser retornada.
axiosInstance.interceptors.response.use(
  // Se a resposta for bem-sucedida, ela será retornada como está.
  (response) => response,
  // Se ocorrer um erro, a promessa será rejeitada e um erro personalizado será retornado. Se a resposta do erro existir, ela será retornada; caso contrário, uma string de erro genérica será retornada.
  (error) =>
    Promise.reject(
      (error.response && error.response) || "General Axios Error Happend"
    )
);

// A instância do axios é exportada para ser usada em outros módulos.
export default axiosInstance;