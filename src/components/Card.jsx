import { useNavigate } from 'react-router-dom';

export function Card({ title, path }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-wrap w-3/5 min-h-[200px] h-1/5 cursor-pointer border border-black rounded-md place-items-center hover:scale-110 transition"
      onClick={() => navigate(path)}
    >
      <p className="w-full text-center break-words font-semibold">{title}</p>
    </div>
  );
}
