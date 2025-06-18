import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import clsx from "clsx";

const DynamicForm = ({
  fields,
  onSubmit,
  validationSchema,
  defaultValues = {},
  submitText = "Submit",
  className = "",
  submitSize = "not-full",
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="flex flex-wrap gap-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
      </div>

      {children}

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
            { "w-full justify-center": submitSize == "full" }
          )}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Submitting...</span>
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;

/* Example usage:

import { z } from "zod";

const validationSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

const fields = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter title",
    width: "full",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
    width: "full",
  },
  {
    name: "status",
    type: "select",
    label: "Status",
    width: "half",
    options: [
      { value: "TODO", label: "To Do" },
      { value: "IN_PROGRESS", label: "In Progress" },
      { value: "DONE", label: "Done" },
    ],
  },
];

const defaultValues = {
  title: "",
  description: "",
  status: "TODO",
};

const MyForm = () => {
  const handleSubmit = async (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <DynamicForm
      fields={fields}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      defaultValues={defaultValues}
      submitText="Create Task"
      className="space-y-6"
    >
      {/* Add any additional form content here */
//     </DynamicForm>
//   );
// };
// */
