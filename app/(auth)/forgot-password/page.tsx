"use client";

import { resetPassword } from "@/actions/reset-password";

export default function ForgotPassword() {
  return (
    <form action={resetPassword}>
      <input placeholder="Email" name="email" type="text" />
      <button type="submit">Send Me Reset link</button>
    </form>
  );
}