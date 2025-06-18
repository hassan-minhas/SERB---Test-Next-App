"use client";

import Button from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        <Button disabled={!password || !username} className="mt-6">
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
