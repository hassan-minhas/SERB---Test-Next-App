export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  variant?: "primary" | "outlined";
}
