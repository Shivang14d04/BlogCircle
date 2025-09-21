import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
      >
        {/* options array can be empty so we need to handle that case
        and if options array is empty then the map will not loop and app will definitely crash
        So, we need to provide a fallback UI in case there are no options, we can also do this through if else like if length of options is 0 then we can show a message */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default React.forwardRef(Select);
// this is done to forward the ref to the select element so that we can access the select element directly from the parent component

// React.forwardRef is a higher order component that allows us to forward the ref to the child component

// we have done it differntly here than in input component
// it's just a different way of writing the same thing
// in input we wrapped the function in React.forwardRef
// and then exported it
// here we defined the function first
// and then while exporting it we wrapped it in React.forwardRef
