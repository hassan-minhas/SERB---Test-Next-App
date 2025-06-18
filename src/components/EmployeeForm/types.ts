import { Employee, EmployeeFormData } from "@/types";

export interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
  submitButtonText: string;
  isSubmitting: boolean;
  title: string;
  subtitle: string;
}
