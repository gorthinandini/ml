import { useState, useEffect } from 'react';
import { Task, TaskCategory, TaskPriority } from '../types';

// Mock data for initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the quarterly project proposal for the client meeting',
    completed: false,
    createdAt: new Date(),
    priority: 'high',
    category: 'work',
  },
  {
    id: '2',
    title: 'Schedule dentist appointment',
    description: 'Call to schedule a checkup appointment',
    completed: false,
    createdAt: new Date(),
    priority: 'medium',
    category: 'health',
  },
  {
    id: '3',
    title: 'Pick up groceries',
    description: 'Milk, eggs, bread, and vegetables',
    completed: true,
    createdAt: new Date(),
    priority: 'low',
    category: 'errands',
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<{
    searchTerm: string;
    category: TaskCategory | 'all';
    priority: TaskPriority | 'all';
    showCompleted: boolean;
  }>({
    searchTerm: '',
    category: 'all',
    priority: 'all',
    showCompleted: true,
  });

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Edit a task
  const editTask = (id: string, updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Reorder tasks (for drag and drop)
  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };

  // Filter tasks based on current filter settings
  const filteredTasks = tasks.filter((task) => {
    // Filter by search term
    const matchesSearch = task.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) || 
      (task.description?.toLowerCase().includes(filter.searchTerm.toLowerCase()) || false);
    
    // Filter by category
    const matchesCategory = filter.category === 'all' || task.category === filter.category;
    
    // Filter by priority
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    
    // Filter by completion status
    const matchesCompleted = filter.showCompleted || !task.completed;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompleted;
  });

  return {
    tasks: filteredTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    reorderTasks,
    filter,
    setFilter,
  };
}