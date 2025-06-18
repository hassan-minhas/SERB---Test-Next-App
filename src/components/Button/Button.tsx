import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./types";

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  const baseClasses =
    "rounded-md bg-blue-600 hover:bg-blue-700 w-full text-white text-sm text-semibold text-white py-3 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed";
  return (
    <button className={twMerge(baseClasses, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
