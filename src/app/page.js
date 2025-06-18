import { getServerUser } from "@/lib/auth-check";
import { getAllProjectsForUser } from "@/actions/project";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getServerUser();
  const projectsResult = await getAllProjectsForUser();
  const projects = projectsResult.projects || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name || "Guest"}!
            </h1>
            <p className="text-text-primary">
              Here's what's happening with your projects.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/projects/new"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              New Project
            </Link>
            <Link
              href="/tasks/new"
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
            >
              New Task
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-sm font-medium text-text-primary">
              Total Projects
            </h3>
            <p className="text-2xl font-bold text-foreground mt-2">
              {projects.length}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-text-primary">
                <span>Active</span>
                <span>
                  {projects.filter((p) => p.status === "active").length || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-sm font-medium text-text-primary">Tasks</h3>
            <p className="text-2xl font-bold text-foreground mt-2">12</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-text-primary">
                <span>In Progress</span>
                <span>5</span>
              </div>
              <div className="flex justify-between text-sm text-text-primary">
                <span>Completed</span>
                <span>7</span>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-sm font-medium text-text-primary">Due Soon</h3>
            <p className="text-2xl font-bold text-foreground mt-2">3</p>
            <div className="mt-4">
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-sm font-medium text-text-primary">
              Team Members
            </h3>
            <p className="text-2xl font-bold text-foreground mt-2">8</p>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm border-2 border-background"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Projects
              </h2>
              <Link
                href="/projects"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block p-4 rounded-lg bg-background hover:bg-secondary/10 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-primary mt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {project.members?.slice(0, 3).map((member) => (
                        <div
                          key={member.user.id}
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm border-2 border-background"
                          title={member.user.name}
                        >
                          {member.user.name[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-text-primary">Active</span>
                    </div>
                    <span className="text-text-primary">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Tasks
              </h2>
              <Link
                href="/tasks"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
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
                {
                  id: 4,
                  title: "Performance Optimization",
                  project: "Core Platform",
                  status: "in-progress",
                  dueDate: "2024-06-21",
                },
              ].map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="block p-4 rounded-lg bg-background hover:bg-secondary/10 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {task.title}
                      </h3>
                      <p className="text-sm text-text-primary mt-1">
                        {task.project}
                      </p>
                    </div>
                    <span
                      className={`
                      px-2 py-1 rounded-full text-xs
                      ${
                        task.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : task.status === "in-progress"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }
                    `}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-text-primary">Due:</span>
                      <span className="text-foreground">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "project_created",
                user: "You",
                action: "created a new project",
                target: "Marketing Website",
                time: "2 hours ago",
              },
              {
                id: 2,
                type: "task_completed",
                user: "Sarah",
                action: "completed task",
                target: "Homepage Design",
                time: "4 hours ago",
              },
              {
                id: 3,
                type: "comment_added",
                user: "Mike",
                action: "commented on",
                target: "API Documentation",
                time: "5 hours ago",
              },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                  {activity.user[0]}
                </div>
                <div>
                  <p className="text-foreground">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-sm text-text-primary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
