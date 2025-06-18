export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  profilePic: string;
}

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
