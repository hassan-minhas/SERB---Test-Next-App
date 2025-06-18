import { twMerge } from "tailwind-merge";
import { InputProps } from "./types";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  error,
  label = "",
  value,
  handleChange,
  className = "",
  type,
  required,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const baseClasses = "w-full border border-slate-200 rounded-lg p-2";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <p className="text-sm font-medium">
          {label} {required && <span className="text-red-500">{" *"}</span>}
        </p>
      )}
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          className={twMerge(
            baseClasses,
            isPasswordField ? "pr-10" : "",
            error ? "border-red-500" : "",
            className
          )}
          type={inputType}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
