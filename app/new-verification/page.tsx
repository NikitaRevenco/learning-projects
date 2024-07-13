"use client";

import { newVerification } from "@/actions/new-verification";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [error, setError] = useState<undefined | string>();
  const [success, setSuccess] = useState<undefined | string>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const verification = await newVerification(token);
      setError(verification.success);
      setSuccess(verification.error);
    } catch {
      setError("Something went wrong!");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      Success:
      <pre>{success}</pre>
      Error:
      <pre>{error}</pre>
    </>
  );
}