export function Button({
  children,
  type = "button",
  bgColor = "blue",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      className={` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
