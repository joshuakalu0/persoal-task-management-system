"use client";
import { updateTask } from "@/actions/task";
import { TaskSet } from "@/components/TaskSet";
import { progress } from "motion";
import { useState } from "react";
import { _toLowerCase } from "zod/v4/core";
import { TaskStatus } from "../../../../../../generated/prisma";

const Status = {
  "in-progress": TaskStatus.IN_PROGRESS,
  todo: TaskStatus.TODO,
  done: TaskStatus.DONE,
};

export default function PageContent({
  projects = [],
  tasks: tasklist,
  project_id,
}) {
  const [tasks, setTasks] = useState(tasklist || []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [itemsBeingDragged, setitemsBeingDragged] = useState(null);
  console.log(tasklist);

  const filteredTasks = tasks.filter((task) => {
    if (selectedProject && task.project !== getProjectName(selectedProject))
      return false;
    if (filterBy !== "all" && task.status !== filterBy) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "progress":
        return b.progress - a.progress;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const todoTasks = sortedTasks.filter(
    (task) => task.status.toLowerCase() === "todo"
  );
  const inProgressTasks = sortedTasks.filter(
    (task) => task.status.toLowerCase() === "in_progress"
  );
  const doneTasks = sortedTasks.filter(
    (task) => task.status.toLowerCase() === "done"
  );

  function getProjectName(projectId) {
    const project = initialProjects.find((p) => p.id === projectId);
    return project?.name || "";
  }

  const handleCreateTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const handleTaskMove = async (taskId, newStatus) => {
    const task = await updateTask(taskId, { status: Status[newStatus] });
    if (task) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus == "in-progress" ? "in_progress" : newStatus,
              }
            : task
        )
      );
    }
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    handleTaskMove(taskId, status).then(() => {
      setDragOverColumn(null);
      setitemsBeingDragged(null);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };
  const handleDrag = (e, task) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    setitemsBeingDragged(task.id);
  };

  return (
    <div className="p-6 bg-">
      <div className="flex gap-6 h-full">
        <TaskSet
          title="To do"
          onDrag={handleDrag}
          project_id={project_id}
          itemOnAir={itemsBeingDragged}
          tasks={todoTasks}
          count={todoTasks.length}
          onAddTask={() => openCreateDialog("todo")}
          onDrop={(e) => handleDrop(e, "todo")}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, "todo")}
          onDragLeave={handleDragLeave}
          isDragOver={dragOverColumn === "todo"}
        />

        <TaskSet
          title="In progress"
          tasks={inProgressTasks}
          onDrag={handleDrag}
          itemOnAir={itemsBeingDragged}
          count={inProgressTasks.length}
          onAddTask={() => openCreateDialog("in-progress")}
          project_id={project_id}
          onDrop={(e) => handleDrop(e, "in-progress")}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, "in-progress")}
          onDragLeave={handleDragLeave}
          isDragOver={dragOverColumn === "in-progress"}
        />

        <TaskSet
          title="Done"
          tasks={doneTasks}
          onDrag={handleDrag}
          itemOnAir={itemsBeingDragged}
          count={doneTasks.length}
          onAddTask={() => openCreateDialog("done")}
          project_id={project_id}
          onDrop={(e) => handleDrop(e, "done")}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, "done")}
          onDragLeave={handleDragLeave}
          isDragOver={dragOverColumn === "done"}
        />
      </div>
    </div>
  );
}
