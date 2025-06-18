import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
    >
      {children}
    </button>
  );
}
