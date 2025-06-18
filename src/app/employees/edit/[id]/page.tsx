"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/Card";
import { EmployeeForm } from "@/components/EmployeeForm";
import Button from "@/components/Button/Button";
import { updateEmployee } from "@/lib/slices/employeeSlice";
import { Employee, EmployeeFormData } from "@/types";
import { RootState } from "@/lib/store";

export default function EditEmployeePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const employeeId = parseInt(params.id as string);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employee = useSelector((state: RootState) =>
    state.employees.employees.find((emp) => emp.id === employeeId)
  );

  const handleSubmit = async (formData: EmployeeFormData) => {
    if (!employee) {
      alert("Employee not found");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedEmployee: Employee = {
        id: employee.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        profilePic: formData.profilePic,
      };

      dispatch(updateEmployee(updatedEmployee));
      router.push("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/employees");
  };

  if (!employee) {
    return (
      <div className="w-full px-6 py-8">
        <Card>
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
            <p className="text-gray-600 mb-6">
              The employee you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button onClick={() => router.push("/employees")}>
              Back to Employees
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      <Card>
        <EmployeeForm
          initialData={employee}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Update Employee"
          isSubmitting={isSubmitting}
          title="Edit Employee"
          subtitle="Update employee information"
        />
      </Card>
    </div>
  );
}
