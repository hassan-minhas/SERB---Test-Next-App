"use client";

import Button from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [username, password]);

  const handleLogin = async () => {
    if (!username || !password) return;

    const result = await login(username, password);

    if (result?.success) {
      router.push("/");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-[550px]">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Input
          label="Username"
          type="text"
          handleChange={(value) => setUsername(value)}
          value={username}
        />
        <Input
          label="Password"
          type="password"
          handleChange={(value) => setPassword(value)}
          value={password}
        />
        {error && (
          <div className="text-red-500 text-sm mt-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        <Button
          disabled={!password || !username || isLoading}
          className="mt-6"
          onClick={handleLogin}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
