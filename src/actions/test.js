// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

{
  /* <AvatarGroup users={[
  { avatar: "url1" },
  { avatar: "url2" },
  { avatar: "url3" },
  { avatar: "url4" }
]} />

prisma migrate dev --name init */
}

//   import { signIn } from 'next-auth/react';

//     const handleLogin = async (email, password) => {
//         const result = await signIn('credentials', {
//             email: email,
//             password: password,
//             redirect: false,
//         });
//         // Handle result (e.g., redirect on success)
//     };
// create a login and create account page, make it rebust and started and use, the auth system will be add with nextauth,
// after login the user should be taken to this account where he will create and view existing projects, if he clicks on create project the user should be shown a model with the create  project form
// name, description, color and members
// he will be able to add member with there email and he can add mutiple members to each project
// after create a project he will be taken the to project:id page where he will manage his prohect i.e create tasks and assign the task to different member that he add on the create project page
// create a view task page task:id and on that page users will be able to view details about a specific task, see Images, uplaod images and also drop messages there will be a button to also dlete task and also edit task
// use tailwind css, motion for animation and keep the ui simple following home page design and also do not touch the home page

// <form
//   action={async (formData) => {
//     "use server";
//     await signIn("credentials", formData);
//   }}
// ></form>;
// bunx prisma migrate dev
// bunx prisma generate
// const session = await auth()
// ajujoshua@gmail.com  admin@gg.com


// :root {
//   --color-bg: #f9fafb;
//   --color-card: #ffffff;
//   --color-border: #e5e7eb;
//   --color-text: #1f2937;
//   --color-muted: #6b7280;

//   --color-primary: #4f46e5;
//   --color-primary-hover: #4338ca;
//   --color-secondary: #f59e0b;
//   --color-success: #22c55e;
//   --color-danger: #ef4444;
//   --color-warning: #facc15;

//   --radius-xl: 1rem;
//   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
// }

// .dark {
//   --color-bg: #111827;
//   --color-card: #1f2937;
//   --color-border: #374151;
//   --color-text: #d1d5db;
//   --color-muted: #9ca3af;
// }

// /* === GLOBAL RESET & BASE === */
// body {
//   @apply font-sans bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300;
// }

// /* === UTILITY CLASSES === */

// .btn {
//   @apply px-4 py-2 rounded-xl font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition;
// }

// .card {
//   @apply p-4 rounded-xl shadow-sm border;
//   background-color: var(--color-card);
//   border-color: var(--color-border);
//   color: var(--color-text);
//   box-shadow: var(--shadow-sm);
// }

// .task-title {
//   @apply text-base font-medium leading-snug;
// }

// .task-meta {
//   @apply flex items-center gap-2 text-sm;
//   color: var(--color-muted);
// }

// .progress-bar {
//   @apply w-full h-1 bg-gray-200 rounded-full overflow-hidden;
// }

// .progress-bar-inner {
//   @apply h-full bg-[var(--color-secondary)] rounded-full transition-all duration-500;
// }

// .section-heading {
//   @apply text-lg font-semibold mb-2;
// }

// /* === DARK MODE HANDLING === */
// .dark .btn {
//   @apply text-white;
// }

// .dark .card {
//   background-color: var(--color-card);
//   border-color: var(--color-border);
//   color: var(--color-text);
}