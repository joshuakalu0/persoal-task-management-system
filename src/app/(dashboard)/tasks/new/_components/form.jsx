"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createTask } from "@/actions/task";
import DynamicForm from "@/components/ui/DynamicForm";
import { taskFields, taskSchema } from "@/lib/form-configs";

export default function CreateTaskPage({ project_id, status: todo_type = "" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const status = todo_type.trim().replace(" ", "_").toUpperCase();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      const res = await createTask(project_id, data);
      if (res.success) {
        router.push(`/projects/${project_id}`);
      } else {
        setError(res.error || "Failed to create task");
      }
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Create New Task
          </h1>
          <Link
            href="/dashboard"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card p-8 rounded-xl border border-border"
        >
          <DynamicForm
            fields={taskFields}
            validationSchema={taskSchema}
            onSubmit={onSubmit}
            defaultValues={{ status: status }}
            className="space-y-6"
            submitText="Create Task"
          />

          {error && (
            <div className="mt-4 bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
