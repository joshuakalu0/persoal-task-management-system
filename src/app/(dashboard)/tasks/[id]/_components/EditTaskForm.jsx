"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/form-configs";
import AssignUserModal from "../_components/AssignUserModal";
import { X } from "lucide-react";
import { assignUsersToTask, updateTask } from "@/actions/task";
import moment from "moment";

export default function EditTaskForm({ task: tasks, project }) {
  const router = useRouter();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: tasks.title,
      description: tasks.description,
      status: tasks.status || "TODO", // Fixed typo from original
      priority: tasks.priority || "LOW",
      dueDate: new Date(tasks.dueDate).toISOString().split("T")[0],
      progress: tasks.progress.toString(),
      assignees: tasks.assignees,
    },
  });

  const onSubmit = async (data) => {
    try {
      data.progress = Number(data.progress);
      data.dueDate = moment(data.dueDate).toISOString();
      const response = await updateTask(tasks.id, data);
      //   console.log("Updating task:", data);
      if (response) {
        router.push(`/tasks/${tasks.id}`);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-secondary p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/tasks/${tasks.id}`}
            className="text-secondary font-normal hover:text-primary/80 transition-colors mb-2 block"
          >
            ← Back to Task
          </Link>
          <h1 className="text-2xl font-bold text-primary">Edit Task</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-primary p-6 rounded-xl todo-border border-border">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-secondary mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full p-2 rounded-lg todo-border border-border text-secondary"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-primary mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="w-full p-2 rounded-lg  todo-border border-border text-secondary min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium ttext-primary mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    {...register("status")}
                    className="w-full p-2 rounded-lg  todo-border border-border text-secondary"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-primary mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    {...register("priority")}
                    className="w-full p-2 rounded-lg  todo-border border-border text-secondary"
                  >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-primary mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    {...register("dueDate")}
                    className="w-full p-2 rounded-lg  todo-border border-border text-secondary"
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-primary mb-1"
                  >
                    Progress
                  </label>
                  <input
                    id="progress"
                    {...register("progress")}
                    className="w-full p-2 rounded-lg  todo-border border-border text-secondary"
                  />

                  {errors.progress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.progress.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Assigned Users
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tasks.assignees.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-3 py-1 rounded-full  todo-border text-secondary text-sm"
                    >
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-sm text-secondary todo-border p-2 rounded-lg hover:text-secondary/80 transition-colors"
                >
                  + Manage Users
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link
                href={`/tasks/${tasks.id}`}
                className="px-4 py-2 rounded-lg border border-border text-text-primary hover:text-foreground transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 btn-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>

        <AssignUserModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          taskId={tasks.id}
          currentAssignees={tasks.assignees}
          project={project}
        />
      </div>
    </div>
  );
}
