"use client";

import { useEffect, useState } from "react";
import { Table, TableColumn } from "@/components/Table";
import { Card } from "@/components/Card";
import Button from "@/components/Button/Button";
import { Employee } from "@/types";
import Image from "next/image";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmployees([]);
      setLoading(false);
    };

    loadEmployees();
  }, []);

  const columns: TableColumn<Employee>[] = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "image",
      header: "Image",
      render: (value, row) => <Image src={row.profilePic} alt={row.name} />,
    },
    {
      key: "name",
      header: "Name",
      render: (value, row) => (
        <div className="font-medium text-gray-900">{row.name}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value) => (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {value}
        </a>
      ),
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
    alert(`Clicked on ${employee.name} `);
  };

  return (
    <div className="w-full px-6 py-8">
      <Card className="px-0">
        <div className="flex items-center justify-between mb-8 px-6">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
          </div>
          <Button className="w-auto">Add Employee</Button>
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
