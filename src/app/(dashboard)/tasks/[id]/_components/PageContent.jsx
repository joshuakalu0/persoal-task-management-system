"use client";

import { useState } from "react";
import Link from "next/link";
import AssignUserModal from "./AssignUserModal";
import {
  addCommentToTask,
  assignUsersToTask,
  updateassignUsers,
} from "@/actions/task";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: "message must be at least 1 characters" }),
});

export default function PageContent({ task, project }) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  // console.log(task);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });
  // console.log(task);

  const handleSendMessage = async (data) => {
    // if (!data.trim()) return;
    const message = await addCommentToTask(
      task.id,
      task.creatorId,
      data.message
    );
    console.log(message);
    if (message) {
      router.refresh();
    }

    // TODO: Implement message sending
    // console.log("Sending message:", data);
  };

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploading(true);

    try {
      // TODO: Implement file upload
      console.log("Uploading files:", selectedFiles);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFiles((prev) => [...prev, ...selectedFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-destructive bg-destructive/10 dark:text-destructive-foreground dark:bg-destructive/20";
      case "MEDIUM":
        return "text-warning bg-warning/10 dark:text-warning-foreground dark:bg-warning/20";
      case "LOW":
        return "text-success bg-success/10 dark:text-success-foreground dark:bg-success/20";
      default:
        return "text-muted bg-muted/10 dark:text-muted-foreground dark:bg-muted/20";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "text-success bg-success/10 dark:text-success-foreground dark:bg-success/20";
      case "IN_PROGRESS":
        return "text-info bg-info/10 dark:text-info-foreground dark:bg-info/20";
      case "TODO":
        return "text-muted bg-muted/10 dark:text-muted-foreground dark:bg-muted/20";
      default:
        return "text-muted bg-muted/10 dark:text-muted-foreground dark:bg-muted/20";
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary/80 transition-colors mb-2 block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace("_", " ")}
            </span>
            <Link
              href={`/tasks/${task.id}/edit`}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit Task
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Task Details */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Description
              </h2>
              <p className="text-text-primary">{task.description}</p>
            </div>

            {/* Messages Section */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Messages
              </h2>

              <div className="space-y-6 mb-6">
                {task.comments?.map((message) => (
                  <div key={message.id} className="flex gap-4">
                    <div className="w-10 h-10 border border-gray-50 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {message.user.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-foreground">
                          {message.user.name}
                        </span>
                        <span className="text-sm text-text-primary">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-text-primary mt-1">
                        {message.content}
                      </p>
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {message.attachments.map((file) => (
                              <a
                                key={file.id}
                                href="#"
                                className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg text-sm text-text-primary hover:text-primary transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  />
                                </svg>
                                {file.name}
                                <span className="text-xs opacity-60">
                                  ({file.size})
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit(handleSendMessage)}
                className="space-y-4"
              >
                <textarea
                  {...register("message")}
                  placeholder="Type your message..."
                  className="w-full p-3 rounded-lg bg-background border border-border text-foreground min-h-[100px]"
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-progress border border-border rounded-lg text-text-primary hover:text-primary transition-colors"
                    >
                      Attach Files
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 btn-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Users */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Assigned Users
                </h2>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-sm border border-gray-50 p-2 rounded-lg text-primary hover:text-primary/80 transition-colors"
                >
                  + Assign Users
                </button>
              </div>
              <div className="space-y-3">
                {task.assignees?.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-background"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {assignee.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {assignee.name}
                      </p>
                      <p className="text-sm text-text-primary">
                        {assignee.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Due Date
              </h2>
              <p className="text-text-primary">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>

            {/* Attachments */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Attachments
              </h2>
              <div className="space-y-2">
                {task.attachments?.map((file) => (
                  <a
                    key={file.id}
                    href="#"
                    className="flex items-center gap-2 p-2 rounded-lg bg-background text-text-primary hover:text-primary transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs opacity-60">
                        Uploaded by {file.uploadedBy}
                      </p>
                    </div>
                    <span className="text-sm opacity-60">{file.size}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AssignUserModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        taskId={task.id}
        currentAssignees={task.assignees}
        project={project}
      />
    </div>
  );
}
