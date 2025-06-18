"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkUserExists, updateProjectWithMembers } from "@/actions/project";
import { X } from "lucide-react";

// Zod schema for project validation
const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  color: z.string().min(3, { message: "Color is required" }),
  members: z.array(z.string().email({ message: "Invalid email address" })),
});

export default function EditProjectForm({ projectId, project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberError, setMemberError] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4F46E5");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name || "",
      description: project.description || "",
      color: project.color || "#4F46E5",
      members: project.members.map((member) => member.user.email) || [],
    },
  });

  // Watch members array for UI updates
  const members = watch("members") || [];

  const colors = [
    { id: 1, color: "#4F46E5", name: "Indigo" },
    { id: 2, color: "#EF4444", name: "Red" },
    { id: 3, color: "#10B981", name: "Green" },
    { id: 4, color: "#8B5CF6", name: "Purple" },
    { id: 5, color: "#06B6D4", name: "Cyan" },
  ];

  const handleAddMember = async () => {
    const email = memberEmail.trim();
    setMemberError("");

    if (!email) return;

    if (!email.includes("@")) {
      setMemberError("Please enter a valid email address");
      return;
    }

    if (members.includes(email)) {
      setMemberError("This email is already added");
      return;
    }

    setAddingMember(true);

    try {
      // Check if user exists
      const result = await checkUserExists(email);

      if (result.error) {
        setMemberError("Failed to verify email");
        return;
      }
      if (!result.exists) {
        setMemberError("Note: This user will need to create an account");
      }

      if (result.success) {
        setValue("members", [...members, email], { shouldValidate: true });
      }

      // Add the email to members array
      setMemberEmail("");

      // Show appropriate message
    } catch (error) {
      setMemberError("Failed to add member");
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = (indexToRemove) => {
    const updatedMembers = members.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("members", updatedMembers, { shouldValidate: true });
    setMemberError("");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      // Add the selected color to the form data
      data.color = selectedColor;

      console.log(data);

      const result = await updateProjectWithMembers(projectId, data);

      //   console.log(">>>>>>>>>>", result);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error("Failed to update project:", error);
      setError("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/projects/${projectId}`}
            className="text-primary hover:text-primary/80 transition-colors mb-2 block"
          >
            ← Back to Project
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Project Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full p-3 rounded-lg bg-background border border-text-primary text-foreground"
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
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
                  {...register("description")}
                  className="w-full p-3 rounded-lg bg-background border border-text-primary text-foreground min-h-[100px]"
                  placeholder="Enter project description"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Color
                </label>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.color);
                        setValue("color", color.color);
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 group relative ${
                        selectedColor === color.color
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : ""
                      }`}
                      style={{ backgroundColor: color.color }}
                    >
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-text-primary opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Members
                </label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={memberEmail}
                        onChange={(e) => {
                          setMemberEmail(e.target.value);
                          setMemberError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddMember();
                          }
                        }}
                        placeholder="Enter member email"
                        className="w-full p-3 rounded-lg bg-background border border-text-primary text-foreground"
                        disabled={addingMember}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      disabled={addingMember || !memberEmail}
                      className="btn-primary text-white px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {addingMember ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent bg-amber-50 rounded-full animate-spin"></span>
                          <span>Adding...</span>
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>

                  {memberError && (
                    <p
                      className={`text-sm mt-1 ${
                        memberError.includes("Note:")
                          ? "text-yellow-500"
                          : "text-red-400"
                      }`}
                    >
                      {memberError}
                    </p>
                  )}
                  <div className="flex space-x-1">
                    <AnimatePresence>
                      {members.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="  "
                        >
                          <div className="flex   flex-wrap gap-2 ">
                            {members.map((email, index) => (
                              <motion.div
                                key={email}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-primary/10 border-2 group border-gray-100 rounded-lg p-2  text-primary px-3 py-1.5  text-sm flex items-center gap-2  hover:bg-primary transition-colors"
                              >
                                <span className="text-off">{email}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMember(index)}
                                  className="text-primary  transition-colors"
                                  title="Remove member"
                                >
                                  <X className="group-hover:text-red-400" />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link
                href={`/projects/${projectId}`}
                className="px-4 py-2 rounded-lg border border-border text-text-primary hover:text-foreground transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-500/10 text-red-500 p-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
}
