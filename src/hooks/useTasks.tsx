
import { useContext, useMemo } from 'react';
import { TaskContext, Task } from '../context/TaskContext';

export const useTasks = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy
  } = useContext(TaskContext);

  const filteredAndSortedTasks = useMemo(() => {
    // Apply status filter
    let result = [...tasks];
    
    if (filterStatus === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filterStatus === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
      result = result.filter(task => task.priority === filterPriority);
    }

    // Apply sorting
    return result.sort((a, b) => {
      if (sortBy === 'dueDate') {
        // Handle null due dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      if (sortBy === 'priority') {
        const priorityValues = { high: 0, medium: 1, low: 2 };
        return priorityValues[a.priority] - priorityValues[b.priority];
      }
      
      // Default sort by createdAt (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tasks, filterStatus, filterPriority, sortBy]);

  return {
    filteredTasks: filteredAndSortedTasks,
    taskActions: {
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      reorderTasks
    },
    filters: {
      status: { filterStatus, setFilterStatus },
      priority: { filterPriority, setFilterPriority }
    },
    sorting: { sortBy, setSortBy }
  };
};
