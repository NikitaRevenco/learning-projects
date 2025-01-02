"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
