export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleChange: (value: string) => void;
  error?: string;
}
