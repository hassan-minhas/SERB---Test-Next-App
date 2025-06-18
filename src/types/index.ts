export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  profilePic: string;
}

export interface Employee extends EmployeeFormData {
  id: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  image?: string;
}
