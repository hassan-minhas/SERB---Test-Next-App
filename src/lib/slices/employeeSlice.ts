import { Employee } from "@/types";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};
