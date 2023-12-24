// A função useContext do pacote 'react' é importada. Esta função é usada para acessar o valor atual do contexto.
import { useContext } from "react";

// O componente AuthContext é importado do arquivo 'auth.context.ts'. Este componente é um contexto de autenticação.
import { AuthContext } from "../auth/auth.context";

// A função useAuth é definida. Esta função é um hook personalizado que permite acessar o valor atual do contexto de autenticação.
const useAuth = () => {
    // A função useContext é chamada com o AuthContext como argumento. Isso retorna o valor atual do AuthContext.
    const context = useContext(AuthContext);

    // Se o valor do contexto for nulo ou indefinido, uma exceção é lançada. Isso pode acontecer se o hook useAuth for usado fora de um provedor de AuthContext.
    if (!context) throw new Error("useAuthContext context is not inside of AuthProvider Tag");

    // O valor do contexto é retornado. Isso permite que os componentes que usam o hook useAuth acessem o valor atual do contexto de autenticação.
    return context;
};

// A função useAuth é exportada como exportação padrão do módulo. Isso permite que ela seja importada em outros módulos usando a sintaxe de importação padrão.
export default useAuth;