import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./types";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "rounded-md w-full text-sm text-semibold px-6 py-3 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed";

  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "outlined":
        return "border border-blue-600 text-blue-600 hover:bg-blue-100";
      default:
        return "";
    }
  };

  return (
    <button
      className={twMerge(baseClasses, getVariantClass(), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
