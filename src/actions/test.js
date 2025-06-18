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
