"use server";
import { getProjectMembers } from "@/actions/project";
import { getTaskById } from "@/actions/task";
import ProtectedRoute, {
  ProtectedRouteWrapper,
} from "@/components/auth/protected-route";
import { getServerUser } from "@/lib/auth-check";
import React from "react";
import EditTaskForm from "../_components/EditTaskForm";

export default async function page(props) {
  const params = await props.params;
  const id = params.id;
  const task = await getTaskById(id);
  const project = await getProjectMembers(task.projectId);
  return (
    <ProtectedRoute>
      <ProtectedRouteWrapper>
        <EditTaskForm project={project} task={task} />
      </ProtectedRouteWrapper>
    </ProtectedRoute>
  );
}
