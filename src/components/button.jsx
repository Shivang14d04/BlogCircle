export default function Button({
  children,
  type = "button",

  className = "",

  ...props
}) {


  return (
    <button
      type={type}

      className={`
        px-5 py-2.5 rounded-lg font-medium shadow-sm
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
         ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
