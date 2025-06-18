// Add Attachment
async function addAttachment(taskId, url, type) {
  return await prisma.attachment.create({
    data: {
      taskId,
      url,
      type,
    },
  });
}

// Get Attachments for Task
async function getAttachments(taskId) {
  return await prisma.attachment.findMany({
    where: { taskId },
  });
}

// Delete Attachment
async function deleteAttachment(attachmentId) {
  return await prisma.attachment.delete({
    where: { id: attachmentId },
  });
}
