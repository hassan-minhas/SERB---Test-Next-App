"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { EmployeeFormData } from "@/types";
import { EmployeeFormProps } from "./types";

export default function EmployeeForm({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
  isSubmitting,
  title,
  subtitle,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    profilePic: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        position: initialData.position,
        profilePic: initialData.profilePic,
      });
    }
  }, [initialData]);

  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex =
      /^[\+]?[1-9][\d]{0,2}[\s\-]?[\(]?[\d]{1,3}[\)]?[\s\-]?[\d]{1,4}[\s\-]?[\d]{1,4}[\s\-]?[\d]{1,9}$/;
    if (!phone) {
      return "Phone number is required";
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return "Please enter a valid phone number";
    }
    return undefined;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (field === "email" && value) {
      const emailError = validateEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }));
    }

    if (field === "phone" && value) {
      const phoneError = validatePhone(value);
      setErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }));
    }
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          profilePic: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const submitData = {
      ...formData,
      profilePic: formData.profilePic || "",
    };

    await onSubmit(submitData);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="gap-2">
          <div className="flex flex-col items-center gap-4">
            {formData.profilePic && (
              <div className="w-20 h-20 rounded-full border-2 border-gray-100 overflow-hidden flex items-center justify-center">
                <Image
                  src={formData.profilePic}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
              id="profile-pic-input"
            />
            <label
              htmlFor="profile-pic-input"
              className="cursor-pointer text-blue-700 rounded-lg text-sm hover:underline"
            >
              {formData.profilePic ? "Replace Image" : "Choose Image"}
            </label>
          </div>
        </div>

        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          handleChange={(value) => handleInputChange("name", value)}
          placeholder="Enter employee's full name"
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          handleChange={(value) => handleInputChange("email", value)}
          placeholder="Enter email address"
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          handleChange={(value) => handleInputChange("phone", value)}
          placeholder="Enter phone number (e.g., +1 234 567 8900)"
          error={errors.phone}
          required
        />

        <Input
          label="Position"
          type="text"
          value={formData.position}
          handleChange={(value) => handleInputChange("position", value)}
          placeholder="Enter job position"
          error={errors.position}
          required
        />

        <div className="flex gap-2 pt-6 justify-evenly">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? `${submitButtonText.split(" ")[0]}...`
              : submitButtonText}
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
