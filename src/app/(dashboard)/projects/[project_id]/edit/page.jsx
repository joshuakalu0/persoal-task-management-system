"use server";
import { getYourProjectDetails } from "@/actions/project";
import DashboardLayoutWrapper from "@/components/layout";
import { getServerUser } from "@/lib/auth-check";
import EditProjectForm from "../_components/EditForm";
import { redirect } from "next/navigation";

export default async function page(props) {
  const params = await props.params;
  const id = params.project_id;

  const user = await getServerUser();
  const res = await getYourProjectDetails(id);
  if (res.error && res.code == 1001) {
    return redirect("/");
  }
  if (res.error && res.code == 1011) {
    return <p>not the your project</p>;
  }
  // console.log("this is the response", project);
  const config = {
    showsection: false,
    user,
    projects: [],
    project_id: id,
  };
  return (
    <DashboardLayoutWrapper config={config}>
      <EditProjectForm projectId={id} project={res.project} />
    </DashboardLayoutWrapper>
  );
}
