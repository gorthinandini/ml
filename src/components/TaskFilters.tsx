import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TaskCategory, TaskPriority } from '../types';

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  category: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
  priority: TaskPriority | 'all';
  onPriorityChange: (priority: TaskPriority | 'all') => void;
  showCompleted: boolean;
  onCompletedChange: (show: boolean) => void;
}

export function TaskFilters({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  showCompleted,
  onCompletedChange,
}: TaskFiltersProps) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="categoryFilter"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value as TaskCategory | 'all')}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="errands">Errands</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="priorityFilter"
              value={priority}
              onChange={(e) => onPriorityChange(e.target.value as TaskPriority | 'all')}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                checked={showCompleted}
                onChange={(e) => onCompletedChange(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show completed tasks</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}