"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Table, TableColumn } from "@/components/Table";
import { Card } from "@/components/Card";
import Button from "@/components/Button/Button";
import { Employee } from "@/types";
import { RootState } from "@/lib/store";
import Image from "next/image";

export default function EmployeesPage() {
  const router = useRouter();
  const { employees, loading } = useSelector(
    (state: RootState) => state.employees
  );

  const columns: TableColumn<Employee>[] = [
    {
      key: "image",
      header: "Image",
      render: (value, row) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={row.profilePic}
            alt={row.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (value, row) => (
        <div className="font-medium text-blue-600">{row.name}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value) => <p className="text-blue-600">{value}</p>,
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "position",
      header: "Position",
    },
  ];

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/edit/${employee.id}`);
  };

  const handleAddEmployee = () => {
    router.push("/employees/add");
  };

  return (
    <div className="w-full px-6 py-8">
      <Card className="px-0">
        <div className="flex items-center justify-between mb-8 px-6">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
          </div>
          <Button className="w-auto" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </div>
        <Table
          data={employees}
          columns={columns}
          loading={loading}
          emptyMessage="No employees found"
          onRowClick={handleRowClick}
          className="border-0 rounded-none"
        />
      </Card>
    </div>
  );
}
