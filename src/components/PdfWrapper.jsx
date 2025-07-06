import { FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function PdfWrapper({ children }) {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-[10%_80%_10%] h-full w-full">
      <div className="flex h-full items-center">
        <FaArrowCircleLeft
          onClick={() => navigate('/')}
          className="w-[50px] h-[50px] hover:scale-110 transition"
        />
      </div>
      <div>{children}</div>
      <div />
    </section>
  );
}
