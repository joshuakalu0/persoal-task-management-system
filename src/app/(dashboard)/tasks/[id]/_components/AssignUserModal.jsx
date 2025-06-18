import { useState } from "react";
import {
  assignUsersToTask,
  unassignUserFromTask,
  updateassignUsers,
} from "@/actions/task";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function AssignUserModal({
  isOpen,
  onClose,
  taskId,
  currentAssignees = [],
  project,
}) {
  // console.log(project);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Mock users data - replace with actual API call
  const users = project.members.map((member) => member.user);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = async (action, id) => {
    if (action == "add") {
      const res = await assignUsersToTask(taskId, id);
      router.refresh();
    }
    if (action == "remove") {
      const res = await unassignUserFromTask(taskId, id);
      router.refresh();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card bg-primary rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Assign Users
          </h2>
          <button
            onClick={onClose}
            className="text-text-primary hover:text-foreground transition-colors"
          >
            <X />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg bg-background border border-border text-foreground"
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {filteredUsers.map((user) => {
            const isAssigned = currentAssignees.some((a) => a.id === user.id);
            const isSelected = selectedUsers.includes(user.id);

            return (
              <div
                key={user.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors bg-primary/10 border-primary border border-border`}
                onClick={() => !isAssigned && handleUserSelect(user.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-text-primary">{user.email}</p>
                  </div>
                  {isAssigned ? (
                    <span
                      onClick={() => handleAssign("remove", user.id)}
                      className="text-sm text-white bg-red-500 rounded-md p-2 "
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Updating...</span>
                        </>
                      ) : (
                        " Unassign"
                      )}{" "}
                    </span>
                  ) : (
                    <span
                      onClick={() => handleAssign("add", user.id)}
                      className="text-sm text-white bg-green-500 rounded-md p-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Updating...</span>
                        </>
                      ) : (
                        "Assign"
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-text-primary hover:text-foreground transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
