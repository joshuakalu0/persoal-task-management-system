"use server";
import { getServerUser } from "@/lib/auth-check";
import { getAllProjectsForUser } from "@/actions/project";
import Link from "next/link";
import DashboardLayoutWrapper from "@/components/layout";
import { getColor } from "@/utiles/colorGenerator";
import { Edit, Pen, PencilLineIcon } from "lucide-react";

export default async function DashboardPage() {
  try {
    user = await getServerUser();
    projectsResult = await getAllProjectsForUser();
    projects = projectsResult.projects || [];

    config = {
      showsection: false,
      user,
      projects,
      project_id: "",
    };
  } catch (error) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary mb-4">
              Error Loading Dashboard
            </h1>
            <p className="text-primary">
              There was an error loading your dashboard. Please try again later.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <DashboardLayoutWrapper config={config}>
      <div className="min-h-screen w-full bg-secondary p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section with Welcome and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border border-border/50">
            <div>
              <h1 className="text-3xl font-bold text-secondary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                Welcome back, {user?.name || "Guest"}!
              </h1>
              <p className="text-primary mt-2">
                Manage your projects and tasks efficiently
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/projects/new"
                className="btn-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                New Project
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Section - Now takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-secondary ">
                  Your Projects
                </h2>
                {/* <Link
                      href="/projects"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      View all projects →
                    </Link> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group block p-6 rounded-xl bg-card border border-border
                        bg-shadow
                        hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex justify-between items-start relative">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-primary mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      {project.ownerId == user.id && (
                        <Link
                          href={`/projects/${project.id}/edit`}
                          className="absolute top-1 right-3 rounded-full"
                        >
                          <PencilLineIcon className="text-primary hover:text-secondary p-2 bg-primary rounded-full size-9" />
                        </Link>
                      )}
                    </div>
                    <div className="mt-6 flex justify-between items-end">
                      <div className="flex -space-x-2">
                        {project.members?.slice(0, 3).map((member) => (
                          <div
                            key={member.user.id}
                            className={`w-8 h-8  border rounded-full  border-background flex items-center justify-center text-sm font-medium
                                  text-white  ${getColor(member.user.name)}`}
                            title={member.user.name}
                          >
                            {member.user.name[0]}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-secondary">Active</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Sidebar with Tasks and Activity */}
            <div className="space-y-8">
              {/* Recent Tasks Section */}
              <div className="bg-card rounded-xl m-border border-border bg-shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-secondary">
                    Recent Tasks
                  </h2>
                  {/* <Link
                        href="/tasks"
                        className="text-primary hover:text-primary/80 transition-colors text-sm"
                      >
                        View all →
                      </Link> */}
                </div>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Design System Updates",
                      project: "Marketing Website",
                      status: "in-progress",
                      dueDate: "2024-06-20",
                    },
                    {
                      id: 2,
                      title: "User Flow Documentation",
                      project: "Mobile App",
                      status: "todo",
                      dueDate: "2024-06-22",
                    },
                    {
                      id: 3,
                      title: "API Integration",
                      project: "Backend Services",
                      status: "completed",
                      dueDate: "2024-06-18",
                    },
                  ].map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.id}`}
                      className="block p-4 rounded-lg bg-transparent/10 m-border hover:bg-secondary/5 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-medium text-secondary line-clamp-1">
                            {task.title}
                          </h3>
                          <p className="text-sm text-primary mt-1">
                            {task.project}
                          </p>
                        </div>
                        <span
                          className={`
                            px-2.5 py-1 rounded-full text-xs font-medium
                            ${
                              task.status === "completed"
                                ? "bg-green-500/10 text-green-500"
                                : task.status === "in-progress"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }
                          `}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-primary">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-card rounded-xl m-border border-border bg-shadow p-6">
                <h2 className="text-xl font-semibold text-secondary mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      type: "project_created",
                      user: "You",
                      action: "created",
                      target: "Marketing Website",
                      time: "2h ago",
                    },
                    {
                      id: 2,
                      type: "task_completed",
                      user: "Sarah",
                      action: "completed",
                      target: "Homepage Design",
                      time: "4h ago",
                    },
                    {
                      id: 3,
                      type: "comment_added",
                      user: "Mike",
                      action: "commented on",
                      target: "API Documentation",
                      time: "5h ago",
                    },
                  ].map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary ring-2 ring-background">
                        {activity.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-secondary">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium text-primary">
                            {activity.target}
                          </span>
                        </p>
                        <p className="text-xs text-primary mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
