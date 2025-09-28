export default function Container({ children, className = "", bg = "transparent" }) {
  return (
    <div
      className={`
        max-w-7xl         /* keeps content nicely centered on wide screens */
        mx-auto           /* centers container horizontally */
        px-4 sm:px-6 lg:px-8  /* good side padding for all breakpoints */
        ${bg}             /* optional background color */
        ${className}      /* allow custom classes */
      `}
    >
      {children}
    </div>
  );
}
