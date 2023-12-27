// Define a interface IProps que especifica os tipos de propriedades que o componente Button pode receber
interface IProps {
  variant: 'primary' | 'secondary' | 'danger' | 'light'; // Define a variante do botão, que determina as cores e o estilo do botão
  type: 'submit' | 'button'; // Define o tipo do botão, que pode ser 'submit' ou 'button'
  label: string; // Define o rótulo do botão
  onClick: () => void; // Define a função a ser chamada quando o botão é clicado
  loading?: boolean; // Define se o botão está em um estado de carregamento
  disabled?: boolean; // Define se o botão está desabilitado
}

// Define o componente Button
const Button = ({ variant, type, label, onClick, loading, disabled }: IProps) => {
  // Define as classes CSS para a variante 'primary' do botão
  const primaryClasses = ' text-white bg-[#754eb4] border-[#754eb4] hover:shadow-[0_0_5px_5px_#754eb44c]';

  // Define as classes CSS para a variante 'secondary' do botão
  const secondaryClasses = ' text-white bg-amber-400 border-amber-400 hover:shadow-[0_0_5px_5px_#fbbe2465]';

  // Define as classes CSS para a variante 'danger' do botão
  const dangerClasses = ' text-white bg-[#AE899A] border-[#AE899A] hover:shadow-[0_0_5px_5px_#ae899a70]';

  // Define as classes CSS para a variante 'light' do botão
  const lightClasses = ' text-[#754eb4] border-[#754eb4] hover:shadow-[0_0_5px_5px_#754eb44c]';

  // Define a função classNameCreator que cria a string de classes CSS final para o botão
  const classNameCreator = (): string => {
    // Inicia com as classes CSS comuns a todas as variantes do botão
    let finalClassName =
      'flex justify-center items-center outline-none duration-300 h-10 text-lg font-semibold px-6 rounded-2xl border-2';
    // Adiciona as classes CSS específicas da variante do botão
    if (variant === 'primary') {
      finalClassName += primaryClasses;
    } else if (variant === 'secondary') {
      finalClassName += secondaryClasses;
    } else if (variant === 'danger') {
      finalClassName += dangerClasses;
    } else if (variant === 'light') {
      finalClassName += lightClasses;
    }
    // Adiciona classes CSS para o estado desabilitado do botão
    finalClassName += ' disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300';
    return finalClassName;
  };

  // Define a função loadingIconCreator que cria um ícone de carregamento
  const loadingIconCreator = () => {
    return <div className='w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800'></div>;
  };

  // Retorna o elemento botão com as classes CSS e propriedades apropriadas
  return (
    <button type={type} onClick={onClick} className={classNameCreator()} disabled={disabled}>
      {loading ? loadingIconCreator() : label}
    </button>
  );
};

// Exporta o componente Button como o export padrão
export default Button;