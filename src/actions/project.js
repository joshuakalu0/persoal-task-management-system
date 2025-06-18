"use server";

import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-check";

// Create Project
export async function createProject(data) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const { name, description, color, members } = data;

    // Create project with owner and members
    const project = await prisma.project.create({
      data: {
        name,
        description,
        color,
        ownerId: user.id,
        members: {
          create: members.map((email) => ({
            user: {
              connect: {
                email,
              },
            },
          })),
        },
      },
      include: {
        members: {
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

    return { success: true, project };
  } catch (error) {
    console.error("Create project error:", error);
    return { error: "Failed to create project" };
  }
}

// Get All Projects for User
export async function getAllProjectsForUser() {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
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

    return { success: true, projects };
  } catch (error) {
    console.error("Get projects error:", error);
    return { error: "Failed to get projects" };
  }
}

// Get Project Details
export async function getProjectDetails(projectId) {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      members: { include: { user: true } },
      tasks: true,
    },
  });
}

export async function getYourProjectDetails(projectId) {
  const user = await getServerUser();

  if (!user) {
    return { error: "Unauthorized", code: 1001 };
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId, ownerId: user.id },
    include: {
      members: { include: { user: true } },
    },
  });
  if (project) {
    return { success: true, project };
  }

  return { error: "project do not belong to you", code: 1011 };
}

// Update Project
async function updateProject(projectId, data) {
  return await prisma.project.update({
    where: { id: projectId },
    data,
  });
}

// Delete Project
async function deleteProject(projectId) {
  return await prisma.project.delete({ where: { id: projectId } });
}

// Add User to Project
async function addUserToProject(userId, projectId, role = "MEMBER") {
  return await prisma.projectMember.create({
    data: { userId, projectId, role },
  });
}

// Remove User from Project
async function removeUserFromProject(userId, projectId) {
  return await prisma.projectMember.delete({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
}

// Change Project Member Role
async function changeProjectMemberRole(userId, projectId, role) {
  return await prisma.projectMember.update({
    where: {
      userId_projectId: { userId, projectId },
    },
    data: { role },
  });
}

// Check if user exists
export async function checkUserExists(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return { success: true, exists: !!user, user };
  } catch (error) {
    console.error("Check user error:", error);
    return { error: "Failed to check user" };
  }
}

export async function updateProjectWithMembers(projectId, data) {
  try {
    const user = await getServerUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    // Check if user is project owner
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!project) {
      return { error: "Project not found" };
    }

    if (project.ownerId !== user.id) {
      return { error: "Only project owner can update project details" };
    }

    const { members: newMembers, ...projectData } = data;

    // Get current member emails for comparison
    const currentMemberEmails = project.members.map(
      (member) => member.user.email
    );

    // Find members to add and remove
    const membersToAdd = newMembers.filter(
      (email) => !currentMemberEmails.includes(email)
    );
    const membersToRemove = currentMemberEmails.filter(
      (email) => !newMembers.includes(email)
    );

    // Update project with new data and member changes
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        members: {
          // Remove members not in the new list
          deleteMany:
            membersToRemove.length > 0
              ? {
                  user: {
                    email: {
                      in: membersToRemove,
                    },
                  },
                }
              : undefined,
          // Add new members
          create: membersToAdd.map((email) => ({
            user: {
              connect: {
                email,
              },
            },
          })),
        },
      },
      include: {
        members: {
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

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Update project error:", error);
    return { error: "Failed to update project" };
  }
}

export async function getProjectMembers(projectId) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      members: { include: { user: true } },
    },
  });
  return project;
}
