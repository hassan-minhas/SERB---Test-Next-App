"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Table, TableColumn } from "@/components/Table";
import { Card } from "@/components/Card";
import { ConfirmationModal } from "@/components/Modal";
import Button from "@/components/Button/Button";
import { Employee } from "@/types";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { deleteEmployee } from "@/lib/slices/employeeSlice";
import Image from "next/image";

export default function EmployeesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
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
            src={row.profilePic || "/placeholder-avatar.png"}
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
    {
      key: "actions",
      header: "Actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              handleEditEmployee(row);
            }}
            className="w-auto px-3 py-1 text-xs"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row);
            }}
            className="w-auto px-3 py-1 text-xs text-red-600 border-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/edit/${employee.id}`);
  };

  const handleEditEmployee = (employee: Employee) => {
    router.push(`/employees/edit/${employee.id}`);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete.id));
      setEmployeeToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
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

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee?"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
