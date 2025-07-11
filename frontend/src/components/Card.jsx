export default function Card({ title, subtitle, children }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-md text-white overflow-hidden">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      <div className="mt-4 overflow-x-auto">{children}</div>
    </div>
  );
}
