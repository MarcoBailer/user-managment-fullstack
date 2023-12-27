import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { AiOutlineHome } from "react-icons/ai";
import { FiLock, FiUnlock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";

// Definindo o componente Header

const Header = () => {
  // Usando o hook personalizado useAuth para ter acesso ao contexto de autenticação
  const { isAuthenticated, isAuthLoading, user, logout } = useAuth();

  // Usando o hook useNavigate do react-router-dom para navegar entre as rotas

  const navigate = useNavigate();

  // Definindo a função userRolesLabelCreator que retorna uma string com os papéis do usuário separados por vírgula

  const userRolesLabelCreator = () => {
    if (user) {
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ", ";
        }
      });
      return result;
    }
    return "---";
  };

  // Retornando o JSX do componente Header

  return (
    <div className="flex justify-between items-center bg-[#f0ecf7] h-12 px-4">
      <div className="flex items-center gap-4">
        <AiOutlineHome
          className="w-8 h-8 text-purple-500 hover:text-purple-700 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-1">
          <h1 className="px-1 border-dashed border-purple-300 rounded-lg">
            AuthLoading: {isAuthLoading ? "true" : "---"}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounded-lg flex items-center gap-1">
            Auth:
            {isAuthenticated ? (
              <FiUnlock className="text-green-600" />
            ) : (
              <FiLock className="text-red-600" />
            )}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounded-lg">
            UserName: {user ? user.userName : "---"}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounded-lg">
            userRoles: {userRolesLabelCreator()}
          </h1>
        </div>
      </div>

      <div>
        {
            isAuthenticated ? (
                <div className="flex items-center gap-2">
                    <Button
                        label='Dashboard'
                        onClick={() => navigate(PATH_DASHBOARD.dashboard)}
                        type='button'
                        variant="light"
                    />
                    <Button 
                        label="Logout" 
                        onClick={logout} 
                        type="button" 
                        variant="light" 
                        />
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Button
                        label='Register'
                        onClick={() => navigate(PATH_PUBLIC.register)}
                        type='button'
                        variant="light"
                    />
                    <Button
                        label='Login'
                        onClick={() => navigate(PATH_PUBLIC.login)}
                        type='button'
                        variant="light"
                    />
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Header;


// Este é um componente de cabeçalho que contém informações sobre o estado de autenticação e o usuário autenticado atual, 
// bem como botões para navegar para diferentes partes do aplicativo ou para fazer logout. 
// Ele usa o hook useNavigate do react-router-dom para manipular a navegação, 
//e o hook personalizado useAuth para acessar o contexto de autenticação.