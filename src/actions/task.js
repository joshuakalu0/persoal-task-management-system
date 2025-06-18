"use server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-check";
import moment from "moment";
import { TaskStatus } from "../../generated/prisma/client";
const Status = {
  "in-progress": TaskStatus.IN_PROGRESS,
  todo: TaskStatus.TODO,
  done: TaskStatus.DONE,
};

export async function createTask(projectId, data) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    // const project = getProjectDetails(projectId);
    console.log(projectId, data);
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: moment(data.dueDate).toISOString(),
        progress: Number(data.progress),
        priority: data.priority,
        status: data.status,
        project: {
          connect: { id: projectId },
        },
        creator: {
          connect: { id: user.id },
        },
        // creatorId: ,
        // assignees: {
        //   connect: data.assignedTo.map((id) => ({ id })),
        // },
      },
    });
    return { success: true, task };
  } catch (error) {
    console.error("Create project error:", error);
    return { error: "Failed to create project" };
  }
}

// Get Tasks for Project
export async function getTasksForProject(projectId) {
  return await prisma.task.findMany({
    where: { projectId },
    include: {
      assignees: true,
      comments: true,
      attachments: true,
      subtasks: true,
    },
  });
}

// Get Task by ID
export async function getTaskById(taskId) {
  return await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignees: true,
      comments: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      attachments: true,
      subtasks: true,
    },
  });
}

// Update Task
export async function updateTask(taskId, data) {
  return await prisma.task.update({
    where: { id: taskId },
    data,
  });
}

// Delete Task
async function deleteTask(taskId) {
  return await prisma.task.delete({ where: { id: taskId } });
}

export async function updateassignUsers(taskId, data) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          connect: data.membersToAdd.map((id) => ({ id })),
          disconnect: data.membersToRemove.map((id) => ({ id })),
        },
      },
      include: {
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return { success: true, task };
  } catch (error) {
    console.error("Update task assignments error:", error);
    return { error: "Failed to update task assignments" };
  }
}

// Assign Users to Task
export async function assignUsersToTask(taskId, userId) {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      assignees: {
        connect: { id: userId },
      },
    },
    include: {
      assignees: true,
    },
  });
}

// Unassign User from Task
export async function unassignUserFromTask(taskId, userId) {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      assignees: {
        disconnect: { id: userId },
      },
    },
  });
}

// Add Comment to Task
export async function addCommentToTask(taskId, userId, content) {
  return await prisma.comment.create({
    data: {
      taskId,
      userId,
      content,
    },
  });
}

// Get Comments for Task
async function getCommentsForTask(taskId) {
  return await prisma.comment.findMany({
    where: { taskId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
}

// Delete Comment
async function deleteComment(commentId, userId) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (comment.userId !== userId) throw new Error("Unauthorized");
  return await prisma.comment.delete({ where: { id: commentId } });
}
