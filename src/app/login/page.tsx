"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending, error } = useLogin();
  const router = useRouter();

  const handleLogin = () => {
    login(
      { username, password },
      {
        onSuccess: () => router.push("/"),
      }
    );
  };

  return (
    <div className="flex flex-col p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <input
        className="border p-3 mb-4 rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-3 mb-4 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={isPending}
        className="bg-blue-500 text-white p-3 rounded"
      >
        {isPending ? "Signing in..." : "Continue"}
      </button>
      {error && <p className="text-red-500 mt-2">{(error as Error).message}</p>}
    </div>
  );
}
