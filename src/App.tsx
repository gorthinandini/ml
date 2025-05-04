import React from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { 
    tasks, 
    addTask, 
    toggleTaskCompletion, 
    deleteTask, 
    editTask,
    filter,
    setFilter
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Task Management
        </h1>
        
        <TaskForm onAddTask={addTask} />
        
        <TaskFilters
          searchTerm={filter.searchTerm}
          onSearchChange={(term) => setFilter({ ...filter, searchTerm: term })}
          category={filter.category}
          onCategoryChange={(category) => setFilter({ ...filter, category })}
          priority={filter.priority}
          onPriorityChange={(priority) => setFilter({ ...filter, priority })}
          showCompleted={filter.showCompleted}
          onCompletedChange={(showCompleted) => setFilter({ ...filter, showCompleted })}
        />
        
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleTaskCompletion}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
      
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>TaskFlow &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;