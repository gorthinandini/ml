import React, { useState } from 'react';
import { Check, X, Edit2, Trash2, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { Task } from '../types';

const priorityClasses = {
  low: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    icon: <Clock className="h-4 w-4 text-teal-600 dark:text-teal-400" />
  },
  medium: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
  },
  high: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
  }
};

const categoryColors = {
  work: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  personal: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  errands: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  health: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
};

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  
  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, {
        title: editedTitle,
        description: editedDescription || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const priorityStyle = priorityClasses[task.priority];
  
  return (
    <div 
      className={`mb-3 rounded-lg border ${priorityStyle.border} p-4 transition-all duration-300 transform hover:shadow-md ${task.completed ? 'opacity-70' : 'opacity-100'}`}
    >
      {isEditing ? (
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Task title"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Description (optional)"
            rows={2}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancelEdit}
              className="p-2 rounded text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={handleSaveEdit}
              className="p-2 rounded text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
            >
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                  task.completed
                    ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600'
                    : 'border-gray-300 dark:border-gray-600'
                } flex items-center justify-center transition-colors duration-200`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-medium text-gray-900 dark:text-white ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-1 text-sm text-gray-600 dark:text-gray-300 ${
                    task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
                  }`}>
                    {task.description}
                  </p>
                )}
                
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColors[task.category]}`}>
                    {task.category}
                  </span>
                  
                  <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                    {priorityStyle.icon}
                    <span>{task.priority}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-1 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Edit task"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}