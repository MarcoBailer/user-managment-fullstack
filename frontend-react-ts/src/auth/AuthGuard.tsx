// Importando os pacotes e componentes necessários
import { Navigate, Outlet } from "react-router-dom";
import  useAuth  from "../hooks/useAuth.hook";
import AuthSpinner from "../components/general/AuthSpinner";
import { PATH_PUBLIC } from "../routes/paths";

// Definindo a interface IProps que especifica os tipos de propriedades que o componente AuthGuard pode receber
interface IProps {
    roles: string[]; // Define os papéis que têm permissão para acessar a rota protegida
}

// Definindo o componente AuthGuard
const AuthGuard = ({roles}: IProps) =>{
    // Usando o hook personalizado useAuth para ter acesso ao contexto de autenticação
    const {isAuthenticated, user, isAuthLoading} = useAuth();

    // Verificando se o usuário autenticado tem acesso à rota protegida
    const hasAccess = isAuthenticated && user?.roles?.find((q)=>roles.includes(q));

    // Se o estado de autenticação ainda estiver carregando, exibe o AuthSpinner
    if(isAuthLoading){
        return <AuthSpinner/>
    }

    // Se o usuário tiver acesso, renderiza o componente filho (Outlet)
    // Se o usuário não tiver acesso, redireciona para a página 'unauthorized'
    return hasAccess ? <Outlet/> : <Navigate to={PATH_PUBLIC.unathorized}/>;
};

// Exportando o componente AuthGuard como exportação padrão do módulo
export default AuthGuard;

// Este é um componente de guarda de autenticação que protege as rotas e verifica se o usuário autenticado tem os papéis necessários para acessar a rota. 
// Ele usa o hook useAuth para acessar o contexto de autenticação e o componente Navigate do react-router-dom para redirecionar o usuário se ele não tiver acesso. 
// Se o estado de autenticação ainda estiver carregando, o AuthGuard renderiza o AuthSpinner.