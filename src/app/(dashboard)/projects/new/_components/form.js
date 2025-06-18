"use client";

import { createProject, checkUserExists } from "@/actions/project";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DynamicForm from "@/components/ui/DynamicForm";
import { projectFields, projectSchema } from "@/lib/form-configs";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export default function ProjectForm({ user }) {
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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {},
  });

  const colors = [
    { id: 1, color: "#4F46E5", name: "Indigo" },
    { id: 2, color: "#EF4444", name: "Red" },
    { id: 3, color: "#10B981", name: "Green" },
    { id: 4, color: "#8B5CF6", name: "Purple" },
    { id: 5, color: "#06B6D4", name: "Cyan" },
  ];
  const members = watch("members") || [];

  const handleAddMember = async (data) => {
    console.log(memberEmail);
    const trimmedEmail = memberEmail.trim();
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
  const handleRemoveMember = (indexToRemove) => {
    const updatedMembers = members.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("members", updatedMembers, { shouldValidate: true });
    setMemberError("");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const result = await createProject(data);

      console.log(result);

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
    <div className="min-h-screen w-full bg-secondary p-8">
      <div className="max-w-3xl bg-off shadow p-3 rounded-lg m-border mx-auto">
        <div className="mb-8">
          <Link
            href={`/dashbaord`}
            className="text-primary hover:text-primary transition-colors mb-2 block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-secondary">Edit Project</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card p-6 rounded-xl m-border border-border">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary mb-1"
                >
                  Project Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full p-3 rounded-lg bg-secondary m-border border-text-primary text-secondary"
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
                  className="block text-sm font-medium text-primary mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="w-full p-3 rounded-lg bg-secondary m-border border-text-primary text-secondary min-h-[100px]"
                  placeholder="Enter project description"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Project Color
                </label>
                <div className="flex gap-2">
                  {colors?.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.color);
                        setValue("color", color.color);
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 group relative ${
                        selectedColor === color.color
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-secondary"
                          : ""
                      }`}
                      style={{ background: color.color }}
                    >
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-primary opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
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
                        className="w-full p-3 rounded-lg bg-secondary border border-text-primary text-secondary"
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
                      {members?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="  "
                        >
                          <div className="flex   flex-wrap gap-2 ">
                            {members?.map((email, index) => (
                              <motion.div
                                key={email}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-primary/10 m-border border-2 group border-gray-100 rounded-lg p-2  text-primary px-3 py-1.5  text-sm flex items-center gap-2  hover:bg-primary transition-colors"
                              >
                                <span className=" text-seminold text-primary">
                                  {email}
                                </span>
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
                href={`/projects`}
                className="px-4 py-2 rounded-lg border border-border text-primary hover:text-secondary transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 btn-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Creating...</span>
                  </>
                ) : (
                  "Account Changes"
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
