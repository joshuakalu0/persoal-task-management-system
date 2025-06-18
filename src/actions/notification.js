// Create Notification
async function createNotification(userId, projectId = null, title, message) {
  return await prisma.notification.create({
    data: {
      userId,
      projectId,
      title,
      message,
    },
  });
}

// Get All Notifications for User
async function getUserNotifications(userId) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

// Mark Notification as Read
async function markNotificationAsRead(notificationId) {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

// Mark All Notifications as Read
async function markAllNotificationsAsRead(userId) {
  return await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
