"use client";

import { createProject, checkUserExists } from "@/actions/project";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/ui/DynamicForm";
import { projectFields, projectSchema } from "@/lib/form-configs";

export default function ProjectForm({ user }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberError, setMemberError] = useState("");
  const router = useRouter();

  const handleAddMember = async (email, setValue, members) => {
    const trimmedEmail = email.trim();
    setMemberError("");

    if (!trimmedEmail) return;

    if (!trimmedEmail.includes("@")) {
      setMemberError("Please enter a valid email address");
      return;
    }

    if (members.includes(trimmedEmail)) {
      setMemberError("This email is already added");
      return;
    }

    if (trimmedEmail === user.email) {
      setMemberError("You are automatically added as a project owner");
      return;
    }

    try {
      const result = await checkUserExists(trimmedEmail);

      if (result.error) {
        setMemberError("Failed to verify email");
        return;
      }

      setValue("members", [...members, trimmedEmail], { shouldValidate: true });
      setMemberEmail("");

      if (!result.exists) {
        setMemberError("Note: This user will need to create an account");
      }
    } catch (error) {
      setMemberError("Failed to add member");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const result = await createProject(data);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-background p-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-2xl mx-auto bg-card p-8 rounded-xl border border-border"
      >
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Create New Project
        </h1>

        <DynamicForm
          fields={projectFields}
          validationSchema={projectSchema}
          onSubmit={onSubmit}
          className="space-y-6"
          submitText="Create Project"
        >
          {/* Member management section */}
          <div className="space-y-4">
            <label className="block text-text-primary mb-2">
              Project Members
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-background border border-text-primary text-foreground"
                placeholder="Enter member email"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const form = e.target.closest("form");
                  const setValue = form._setValue;
                  const members = form._values.members || [];
                  handleAddMember(memberEmail, setValue, members);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
            {memberError && (
              <p className="text-red-400 text-sm">{memberError}</p>
            )}
          </div>
        </DynamicForm>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-500/10 text-red-500 p-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
