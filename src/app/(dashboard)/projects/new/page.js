import ProtectedRoute, {
  ProtectedRouteWrapper,
} from "@/components/auth/protected-route";
import { getServerUser } from "@/lib/auth-check";
import React from "react";
import ProjectForm from "./_components/form";

export default async function page() {
  const user = await getServerUser();

  return (
    <ProtectedRoute>
      <ProtectedRouteWrapper>
        <ProjectForm user={user} />
      </ProtectedRouteWrapper>
    </ProtectedRoute>
  );
}
