import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@/types";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<Employee, "id">>) => {
      const newEmployee: Employee = {
        ...action.payload,
        id: Date.now(),
      };
      state.employees.push(newEmployee);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setLoading,
  setError,
} = employeeSlice.actions;
export default employeeSlice.reducer;
