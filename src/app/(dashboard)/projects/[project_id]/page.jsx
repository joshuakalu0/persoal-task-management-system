"use server";
import { getAllProjectsForUser } from "@/actions/project";
import DashboardLayoutWrapper from "@/components/layout";
import { getServerUser } from "@/lib/auth-check";
import PageContent from "./_components/pageContent";
import { getTasksForProject } from "@/actions/task";

export default async function page(props) {
  const params = await props.params;
  const id = params.project_id;

  const user = await getServerUser();
  const projectsResult = await getAllProjectsForUser();
  const tasks = await getTasksForProject(id);
  const projects = projectsResult.projects || [];
  const config = {
    showsection: true,
    user,
    projects,
    project_id: id,
  };
  return (
    <DashboardLayoutWrapper config={config}>
      <PageContent project_id={id} projects={projects} tasks={tasks} />
    </DashboardLayoutWrapper>
  );
}
