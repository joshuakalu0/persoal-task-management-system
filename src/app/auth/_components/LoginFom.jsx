"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DynamicForm from "@/components/ui/DynamicForm";
import { loginFields, loginSchema } from "@/lib/form-configs";
import { loginUser } from "@/actions/user";

export default function LoginPage() {
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const result = await loginUser(data);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <DynamicForm
          fields={loginFields}
          onSubmit={onSubmit}
          validationSchema={loginSchema}
          defaultValues={{
            email: "",
            password: "",
          }}
          submitText="Login"
          submitSize="full"
          className="space-y-4"
        >
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </DynamicForm>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-gray-200 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
