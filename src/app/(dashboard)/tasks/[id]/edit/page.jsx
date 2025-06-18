"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AssignUserModal from "../_components/AssignUserModal";

export default function EditTaskPage({ params }) {
  const router = useRouter();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
    assignees: [],
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock data fetch
    setTask({
      id: params.id,
      title: "Implement User Authentication",
      description:
        "Add user authentication using JWT tokens and implement secure password hashing.",
      status: "IN_PROGRESS",
      priority: "HIGH",
      dueDate: "2024-06-20",
      assignees: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ],
    });
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement actual API call to update task
      console.log("Updating task:", task);
      router.push(`/tasks/${params.id}`);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleAssignUsers = async (selectedUserIds) => {
    try {
      // TODO: Implement actual API call to assign users
      console.log("Assigning users:", selectedUserIds);
      // Mock update
      const newAssignees = selectedUserIds.map((id) => ({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      }));
      setTask((prev) => ({
        ...prev,
        assignees: [...prev.assignees, ...newAssignees],
      }));
    } catch (error) {
      console.error("Failed to assign users:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/tasks/${params.id}`}
            className="text-primary hover:text-primary/80 transition-colors mb-2 block"
          >
            ← Back to Task
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Edit Task</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-background border border-border text-foreground min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={task.status}
                    onChange={(e) =>
                      setTask({ ...task, status: e.target.value })
                    }
                    className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={task.priority}
                    onChange={(e) =>
                      setTask({ ...task, priority: e.target.value })
                    }
                    className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={task.dueDate}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Assigned Users
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {task.assignees.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      <span>{user.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setTask({
                            ...task,
                            assignees: task.assignees.filter(
                              (a) => a.id !== user.id
                            ),
                          });
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  + Assign Users
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link
                href={`/tasks/${params.id}`}
                className="px-4 py-2 rounded-lg border border-border text-text-primary hover:text-foreground transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>

        <AssignUserModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssignUsers}
          currentAssignees={task.assignees}
        />
      </div>
    </div>
  );
}
