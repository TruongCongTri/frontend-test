export default function ActionButton({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-sm font-semibold transition-all ${className}`}
    >
      {children}
    </button>
  );
}
