import { twMerge } from "tailwind-merge";
import { CardProps } from "./types";

const Card = ({ className = "", children }: CardProps) => {
  const baseClasses =
    "p-6 w-full border border-slate-200 flex flex-col rounded-lg space-y-2";
  return <div className={twMerge(baseClasses, className)}>{children}</div>;
};

export default Card;
