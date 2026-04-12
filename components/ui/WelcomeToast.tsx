"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export function WelcomeToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoginSuccess = searchParams.get("login") === "success";
    const isSignupSuccess = searchParams.get("signup") === "success";

    if (isLoginSuccess || isSignupSuccess) {
      // Remove query parameters immediately to avoid re-triggering
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      params.delete("signup");
      router.replace(`${pathname}?${params.toString()}`);

      if (isSignupSuccess) {
        toast.success("Account Created", {
          description: "Welcome to PitchSnap. Your command center is ready.",
          duration: 5000,
        });
      } else if (isLoginSuccess) {
        toast.success("Authentication successful", {
          description: "Welcome back to your command center.",
          duration: 4000,
        });
      }
    }
  }, [searchParams, router, pathname]);

  return null;
}
