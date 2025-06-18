import { z } from "zod";

// Login Form Configuration
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginFields = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    width: "full",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    width: "full",
  },
];

// Register Form Configuration
export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerFields = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    width: "full",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    width: "full",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    width: "full",
  },
];

// Project Form Configuration
export const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  color: z.string().min(3, { message: "Color is required" }),
  members: z.array(z.string().email({ message: "Invalid email address" })),
});

export const projectFields = [
  {
    name: "name",
    type: "text",
    label: "Project Name",
    placeholder: "Enter project name",
    width: "full",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter project description",
    width: "full",
  },
  {
    name: "color",
    type: "select",
    label: "Project Color",
    width: "full",
    options: [
      { value: "#4F46E5", label: "Indigo" },
      { value: "#EF4444", label: "Red" },
      { value: "#10B981", label: "Green" },
      { value: "#8B5CF6", label: "Purple" },
      { value: "#06B6D4", label: "Cyan" },
    ],
  },
];

// Task Form Configuration
export const taskSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" }),
    description: z
      .string()
      .min(5, { message: "Description must be at least 5 characters" }),
    progress: z
      .string()
      .min(0, { message: "minimum is 0" })
      .max(7, { message: "Max number is 7" }),
    assignedTo: z
      .array(z.string().email({ message: "Invalid email address" }))
      .optional(),
    dueDate: z.string().min(1, { message: "Due date is required" }),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  })
  .refine(
    (data) => {
      try {
        Number(data.progress);
        return data.progress >= 0 && data.progress <= 10;
      } catch (error) {
        return false;
      }
    },
    { message: "progress must be a number from 0 - 10", path: ["progress"] }
  );

export const taskFields = [
  {
    name: "title",
    type: "text",
    label: "Task Title",
    placeholder: "Enter task title",
    width: "full",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter task description",
    width: "full",
  },
  {
    type: "double",
    fields: [
      {
        name: "progress",
        type: "text",
        label: "Progress",
        placeholder: "Enter progress (0-7)",
        width: "full",
      },
      {
        name: "dueDate",
        type: "date",
        label: "Due Date",
        width: "full",
      },
    ],
  },
  {
    type: "double",
    fields: [
      {
        name: "priority",
        type: "select",
        label: "Priority",
        width: "full",
        options: [
          { value: "LOW", label: "Low" },
          { value: "NORMAL", label: "Normal" },
          { value: "HIGH", label: "High" },
          { value: "URGENT", label: "Urgent" },
        ],
      },
      {
        name: "status",
        type: "select",
        label: "Status",
        width: "full",
        options: [
          { value: "TODO", label: "To Do" },
          { value: "IN_PROGRESS", label: "In Progress" },
          { value: "DONE", label: "Done" },
        ],
      },
    ],
  },
  // {
  //   name: "progress",
  //   type: "number",
  //   label: "Progress",
  //   placeholder: "Enter progress (0-7)",
  //   width: "half",
  // },
  // {
  //   name: "dueDate",
  //   type: "date",
  //   label: "Due Date",
  //   width: "half",
  // },
  // {
  //   name: "priority",
  //   type: "select",
  //   label: "Priority",
  //   width: "half",
  //   options: [
  //     { value: "LOW", label: "Low" },
  //     { value: "NORMAL", label: "Normal" },
  //     { value: "HIGH", label: "High" },
  //     { value: "URGENT", label: "Urgent" },
  //   ],
  // },
  // {
  //   name: "status",
  //   type: "select",
  //   label: "Status",
  //   width: "half",
  //   options: [
  //     { value: "TODO", label: "To Do" },
  //     { value: "IN_PROGRESS", label: "In Progress" },
  //     { value: "COMPLETED", label: "Completed" },
  //   ],
  // },
];

// Edit Task Form Configuration

