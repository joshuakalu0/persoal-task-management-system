"use server";
import ProtectedRoute, {
  ProtectedRouteWrapper,
} from "@/components/auth/protected-route";
import CreateTaskPage from "./_components/form";

export default async function page(props) {
  const query = await props.searchParams;
  console.log(query.projectId);
  return (
    <ProtectedRoute>
      <ProtectedRouteWrapper>
        <CreateTaskPage project_id={query.projectId} status={query.status} />
      </ProtectedRouteWrapper>
    </ProtectedRoute>
  );
}
