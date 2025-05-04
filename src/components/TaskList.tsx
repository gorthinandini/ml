import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}

export function TaskList({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center">
          <ClipboardList className="h-16 w-16 text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No tasks found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          There are no tasks matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}