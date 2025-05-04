import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, TaskCategory, TaskPriority } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        priority,
        category,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('work');
      setIsFormOpen(false);
    }
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New Task</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Task Title*
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="What needs to be done?"
                required
                autoFocus
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Add some details..."
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="errands">Errands</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors duration-200"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}