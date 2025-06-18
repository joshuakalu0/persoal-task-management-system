import { getTaskById } from "@/actions/task";
import PageContent from "./_components/PageContent";
import { getProjectMembers } from "@/actions/project";
import ProtectedRoute, {
  ProtectedRouteWrapper,
} from "@/components/auth/protected-route";

export default async function page(props) {
  const params = await props.params;

  const id = params.id;
  const task = await getTaskById(id);
  const project = await getProjectMembers(task.projectId);
  return (
    <ProtectedRoute>
      <ProtectedRouteWrapper>
        <PageContent task={task} project={project} />
      </ProtectedRouteWrapper>
    </ProtectedRoute>
  );
}
