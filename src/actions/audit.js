// Log Action
async function logAction(userId, projectId = null, action, metadata = {}) {
  return await prisma.auditLog.create({
    data: {
      userId,
      projectId,
      action,
      metadata,
    },
  });
}

// Get Logs for a Project
async function getProjectLogs(projectId) {
  return await prisma.auditLog.findMany({
    where: { projectId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

// Get Logs for a User (optional)
async function getUserLogs(userId) {
  return await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

await logAction(userId, projectId, "TASK_UPDATED", {
  taskId,
  oldStatus: "TODO",
  newStatus: "IN_PROGRESS",
});
