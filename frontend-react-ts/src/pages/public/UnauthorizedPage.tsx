import { TbHandStop } from 'react-icons/tb';

const UnauthorizedPage = () => {
  return (
    <div className='pageTemplate1'>
      <div className='w-full h-[448px] flex flex-col justify-center items-center gap-4 text-white bg-red-500 border-4 border-white rounded-[300px] ring-4 ring-red-600'>
        <TbHandStop className='text-9xl ' />
        <h1 className='text-3xl font-bold'>Calma ae chara! precisa ter acesso pra vir aqui.</h1>
      </div>
    </div>
  );
};

export default UnauthorizedPage;