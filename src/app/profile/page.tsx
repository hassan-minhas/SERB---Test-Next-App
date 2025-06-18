"use client";

import { useEffect } from "react";
import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/lib/useAuth";
import Image from "next/image";
import Button from "@/components/Button/Button";

export default function ProfilePage() {
  const { user, isLoading, error, getCurrentUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full mx-4">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={getCurrentUser}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Profile Data
            </h2>
            <p className="text-gray-600">
              Unable to load your profile information.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <div className=" mx-auto">
            <Image
              src={user.image || "/placeholder-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              width={64}
              height={64}
            />
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Name:</span>
            <span className="text-gray-500">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="font-medium">Email:</span>
            <span className="text-gray-500">{user.email}</span>
          </div>

          {user.phone && (
            <div className="flex gap-2">
              <span className="font-medium">Phone:</span>
              <span className="text-gray-500">{user.phone}</span>
            </div>
          )}

          {user.role && (
            <div className="flex gap-2">
              <span className="font-medium">Role:</span>
              <span className="text-gray-500">{user.role}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
