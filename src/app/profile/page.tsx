"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { User } from "@/types";
import api, { auth } from "@/lib/auth";
import Image from "next/image";
import Button from "@/components/Button/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = auth.getToken();
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
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
            <Button onClick={() => window.location.reload()}>Try Again</Button>
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
              alt={user.firstName}
              width={64}
              height={64}
            />
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Name:</span>
            <span className="text-gray-500">{user.firstName}</span>
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
