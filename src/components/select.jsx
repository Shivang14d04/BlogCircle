import React, { useId } from "react";

function Select({ options = [], label, className = "", placeholder = "Select an option", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-dark-900 "
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm 
          shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 
          focus:outline-none transition-colors duration-200 ease-in-out
          disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
      >
        {/* Placeholder option */}
        <option value="" disabled selected hidden>
          {placeholder}
        </option>

        {/* Options list */}
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
