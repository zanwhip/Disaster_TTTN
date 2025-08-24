"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { LoginData } from "@/types/next-auth";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "Login failed");
      }

      return result;
    },
  });
}
