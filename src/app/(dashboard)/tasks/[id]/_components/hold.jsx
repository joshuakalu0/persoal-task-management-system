export default function TaskViewPage({ params }) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Mock task data (replace with actual API call)
  const task = {
    id: params.id,
    title: "Implement User Authentication",
    description:
      "Add user authentication using JWT tokens and implement secure password hashing.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2024-06-20",
    project: {
      id: 1,
      name: "Project Management System",
    },
    assignedTo: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
    messages: [
      {
        id: 1,
        user: { name: "John Doe", email: "john@example.com" },
        content: "I've started working on the JWT implementation.",
        timestamp: "2024-03-15T10:30:00Z",
        attachments: [{ id: 1, name: "auth-flow.pdf", size: "2.4 MB" }],
      },
      {
        id: 2,
        user: { name: "Jane Smith", email: "jane@example.com" },
        content:
          "Great! I'll review the password hashing implementation once you're done.",
        timestamp: "2024-03-15T11:15:00Z",
      },
    ],
    attachments: [
      { id: 1, name: "auth-flow.pdf", size: "2.4 MB", uploadedBy: "John Doe" },
      {
        id: 2,
        name: "security-requirements.docx",
        size: "1.1 MB",
        uploadedBy: "Jane Smith",
      },
    ],
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement message sending
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploading(true);

    try {
      // TODO: Implement file upload
      console.log("Uploading files:", selectedFiles);

      // Mock upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFiles((prev) => [...prev, ...selectedFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-red-500 bg-red-500/10";
      case "MEDIUM":
        return "text-yellow-500 bg-yellow-500/10";
      case "LOW":
        return "text-green-500 bg-green-500/10";
      default:
        return "text-blue-500 bg-blue-500/10";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500 bg-green-500/10";
      case "IN_PROGRESS":
        return "text-blue-500 bg-blue-500/10";
      case "TODO":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary/80 transition-colors mb-2 block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Task Details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Description
              </h2>
              <p className="text-text-primary">{task.description}</p>
            </motion.div>

            {/* Messages Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Messages
              </h2>

              <div className="space-y-6 mb-6">
                {task.messages.map((message) => (
                  <div key={message.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {message.user.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-foreground">
                          {message.user.name}
                        </span>
                        <span className="text-sm text-text-primary">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-text-primary mt-1">
                        {message.content}
                      </p>
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {message.attachments.map((file) => (
                              <a
                                key={file.id}
                                href="#"
                                className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg text-sm text-text-primary hover:text-primary transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  />
                                </svg>
                                {file.name}
                                <span className="text-xs opacity-60">
                                  ({file.size})
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 rounded-lg bg-background border border-text-primary text-foreground min-h-[100px]"
                />
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-background border border-text-primary rounded-lg text-text-primary hover:text-primary transition-colors"
                    >
                      Attach Files
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Project Info */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Project
              </h2>
              <Link
                href={`/projects/${task.project.id}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {task.project.name}
              </Link>
            </div>

            {/* Due Date */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Due Date
              </h2>
              <p className="text-text-primary">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>

            {/* Assigned Members */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Assigned To
              </h2>
              <div className="space-y-3">
                {task.assignedTo.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-foreground font-medium">
                        {member.name}
                      </p>
                      <p className="text-sm text-text-primary">
                        {member.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Attachments
              </h2>
              <div className="space-y-3">
                {task.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <div>
                        <p className="text-foreground">{file.name}</p>
                        <p className="text-xs text-text-primary">
                          {file.size} • Uploaded by {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
