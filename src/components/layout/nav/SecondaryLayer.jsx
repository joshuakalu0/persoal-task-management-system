import { Search, Bell, Plus, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, FilterOption } from "@/types";

export function Header({
  onCreateTask,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
}) {
  return (
    <div className="border-b border-gray-800 bg-[#1a1d23] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-white">
            Welcome back, Vincent 👋
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search projects, tasks..."
              className="pl-10 w-64 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <Bell size={18} />
          </Button>
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-gray-400">19 May 2022</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            </div>
            <span className="text-white font-medium">Board view</span>
          </div>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white text-sm"
          >
            + Add view
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={filterBy}
            onValueChange={(value: FilterOption) => onFilterChange(value)}
          >
            <SelectTrigger className="w-24 bg-gray-800/50 border-gray-700 text-white">
              <Filter size={14} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="todo">To do</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => onSortChange(value)}
          >
            <SelectTrigger className="w-24 bg-gray-800/50 border-gray-700 text-white">
              <SortAsc size={14} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={onCreateTask}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={16} className="mr-2" />
            New template
          </Button>
        </div>
      </div>
    </div>
  );
}
