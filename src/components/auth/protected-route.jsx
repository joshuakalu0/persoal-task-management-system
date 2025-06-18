import { getServerUser } from "@/lib/auth-check";
import { redirect } from "next/navigation";
import Loading from "@/components/ui/loading";
import React from "react";

export default async function ProtectedRoute({ children }) {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/login");
  }

  return children;
}

// Client-side loading wrapper
export function ProtectedRouteWrapper({ children }) {
  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
}
