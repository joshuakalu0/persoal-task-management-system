import { List, MessageCircle, Paperclip } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarGroup from "./Avatars";

export function TaskCard({ task, itemOnAir = null }) {
  const getProgressColor = () => {
    if (task.progress >= 80) return "progress-green";
    if (task.progress >= 50) return "bg-progress";
    return "bg-progress";
  };

  const formatDate = (dateStringg) => {
    // const date = new Date(dateString);
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  // console.log(task);

  return (
    <AnimatePresence mode="wait">
      {itemOnAir == task.id ? (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="w-[288px] rounded-lg border-dashed border-white/50 border flex justify-center items-center h-[151px]"
        >
          <span className="text-primary">Return here</span>
        </motion.div>
      ) : (
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={clsx(
            `bg-secondary rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all cursor-grab active:cursor-grabbing`,
            itemOnAir == task.id && "opacity-50 rotate-2 scale-105"
          )}
        >
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-secondary font-semibold text-sm leading-tight">
              {task.title}
            </h3>
            <button className="text-gray-300 font-semibold  border border-white/50 rounded-full p-o.5 hover:text-white transition-colors">
              <svg
                className="w-3 rotate-90 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          <p className="text-primary text-xs mb-4">{task.description}</p>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 flex justify-center items-center text-xs">
                  <List className="h-5 w-5 text-primary p-1" />
                  Progress
                </span>
                <span className="text-white text-xs font-medium">
                  {task.progress}/10
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <motion.div
                  className={clsx(
                    "h-1 rounded-full transition-all",
                    getProgressColor()
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${(task.progress / 10) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">
                {formatDate(task.date)}
              </span>
              <div className="flex items-center gap-3">
                {task.comments.length > 0 && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageCircle size={12} />
                    <span className="text-xs">{task.comments.length}</span>
                  </div>
                )}
                {task.attachments > 0 && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <Paperclip size={12} />
                    <span className="text-xs">{task.attachments.length}</span>
                  </div>
                )}
                {task.assignees.length > 0 && (
                  <AvatarGroup users={task.assignees.map((u) => u.name)} />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
