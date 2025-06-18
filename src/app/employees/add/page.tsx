"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { EmployeeForm } from "@/components/EmployeeForm";
import { addEmployee } from "@/lib/slices/employeeSlice";
import { EmployeeFormData } from "@/types";

export default function AddEmployeePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: EmployeeFormData) => {
    setIsSubmitting(true);

    try {
      const employeeData: EmployeeFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        profilePic: formData.profilePic,
      };

      dispatch(addEmployee(employeeData));
      router.push("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/employees");
  };

  return (
    <div className="w-full px-6 py-8">
      <Card>
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Add Employee"
          isSubmitting={isSubmitting}
          title="Add New Employee"
          subtitle="Fill in the details to add a new employee"
        />
      </Card>
    </div>
  );
}
