"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/ui/DynamicForm";
import { registerFields, registerSchema } from "@/lib/form-configs";
import { registerUser } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const result = await registerUser(data);
    if (result.error) {
      setError(result.error);
      return;
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
          Create Account
        </h2>

        <DynamicForm
          fields={registerFields}
          onSubmit={onSubmit}
          validationSchema={registerSchema}
          defaultValues={{
            name: "",
            email: "",
            password: "",
          }}
          submitText="Register"
          className="space-y-4"
        >
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </DynamicForm>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gray-200 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
