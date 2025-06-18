import { Plus } from "lucide-react";

import { TaskCard } from "./ui/TaskCard";
import Button from "./ui/button";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function TaskSet({
  title,
  tasks,
  count,
  onAddTask,
  onDrop,
  onDrag,
  onDragOver,
  onDragEnter,
  onDragLeave,
  isDragOver,
  itemOnAir,
}) {
  function inList() {
    // checks if the Element in air is in this list already
    let in_here = false;
    tasks?.forEach((element) => {
      console.log(element, itemOnAir);
      if (element.id == itemOnAir) {
        in_here = true;
      }
    });
    return in_here;
  }

  return (
    <div className="flex-1 min-w-80 bg-primary rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <h2 className="text-primary font-medium">{title}</h2>
          <span className="text-primary  py-1 rounded text-xs">({count})</span>
        </div>
        <button
          onClick={onAddTask}
          variant="ghost"
          size="icon"
          className="flex space-x-1 justify-center items-center"
        >
          <Plus size={14} className="p-0.5 bg-white/30 rounded-full" />
          <span> Add new task</span>
        </button>
      </div>

      <div
        className={`space-y-3 min-h-96 p-2 rounded-lg transition-colors ${
          isDragOver
            ? "bg-gray-800/30 border-2 border-dashed border-gray-600"
            : ""
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrag={onDrag}
      >
        {tasks?.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => onDrag(e, task)}>
            <Link href={`/tasks/${task.id}`}>
              <TaskCard task={task} itemOnAir={itemOnAir} />
            </Link>
          </div>
        ))}
        <AnimatePresence>
          {isDragOver && !inList() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[288px] rounded-lg border-dashed border-white/50 border flex justify-center items-center h-[151px]"
            >
              <span className="text-primary">Drag your task here...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
