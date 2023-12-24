// Definindo a interface IProps que especifica os tipos de propriedades que o componente Button pode receber
interface IProps {
  variant: "primary" | "secondary" | "danger" | "light"; // Define a variante do botão, que determina suas cores
  type: "submit" | "button"; // Define o tipo do botão, que pode ser 'submit' ou 'button'
  label: string; // Define o texto que será exibido no botão
  onClick: () => void; // Define a função que será executada quando o botão for clicado
  loading?: boolean; // Define se o botão está em um estado de carregamento
  disabled?: boolean; // Define se o botão está desabilitado
}

// Define o componente Button
const Button = ({
  variant,
  type,
  label,
  onClick,
  loading,
  disabled,
}: IProps) => {
  // Define as classes CSS para cada variante do botão
  const primaryClasses =
    "text-white bg-[#754eb4] border-[#754eb4] houver:shadow-[0_0_5px_5px_#754eb44c]";

  const secondaryClasses =
    "text-white bg-amber-400 border-amber-400 hover:shadow-[0_0_5px_5px_#fbbe2465]";

  const dangerClasses =
    "text-white bg-[#AE899A] border-[#AE899A] hover:shadow-[0_0_5px_5px_#ae899a70]";

  const lightClasses =
    "text-[#754eb4] border-[#754eb4] hover:shadow-[0_0_5px_5px_#754eb44c]";

  // Define a função que cria as classes CSS do botão
  const calssNameCreator = (): string => {
    let finalClassName =
      "flex justify-center items-center outline-none duration-300 h-10 text-lg font-semibold px-6 rounded-2x1 border-2";
    if (variant === "primary") {
      finalClassName += primaryClasses;
    } else if (variant === "secondary") {
      finalClassName += secondaryClasses;
    } else if (variant === "danger") {
      finalClassName += dangerClasses;
    } else if (variant === "light") {
      finalClassName += lightClasses;
    }
    finalClassName +=
      "disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300";
    return finalClassName;
  };

  const loadingIconCreator = () => {
    return <div className="w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800"></div>;
  };

  return <button type={type} onClick={onClick} className={calssNameCreator()} disabled={disabled}>
    {loading ? loadingIconCreator() : label}
  </button>;
};

export default Button;

// Este é um componente de botão personalizado que pode receber várias propriedades para personalizar seu comportamento e aparência.
//  Ele usa uma interface TypeScript para garantir que as propriedades corretas sejam passadas. 
// As classes CSS são geradas dinamicamente com base na variante do botão.