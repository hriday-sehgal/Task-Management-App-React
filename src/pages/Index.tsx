
import React, { useState } from 'react';
import { TaskProvider } from '@/context/TaskContext';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskFilters } from '@/components/TaskFilters';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, CheckCircle, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TaskManager = () => {
  const { toast } = useToast();
  const { 
    filteredTasks, 
    taskActions, 
    filters, 
    sorting 
  } = useTasks();
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = (taskData: Parameters<typeof taskActions.addTask>[0]) => {
    taskActions.addTask(taskData);
    setShowAddTask(false);
    toast({
      title: "Task created",
      description: "Your task has been successfully created."
    });
  };

  const handleUpdateTask: typeof taskActions.updateTask = (id, updates) => {
    taskActions.updateTask(id, updates);
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated."
    });
  };

  const handleDeleteTask = (id: string) => {
    taskActions.deleteTask(id);
    toast({
      title: "Task deleted",
      description: "Your task has been permanently removed."
    });
  };

  const handleToggleComplete = (id: string) => {
    taskActions.toggleComplete(id);
    const task = filteredTasks.find(t => t.id === id);
    toast({
      title: task?.completed ? "Task marked incomplete" : "Task completed",
      description: task?.completed 
        ? "Task has been marked as incomplete." 
        : "Congratulations on completing your task!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowAddTask(!showAddTask)}
                variant={showAddTask ? "outline" : "default"}
                className="flex items-center gap-1"
              >
                {showAddTask ? "Cancel" : (
                  <>
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Task</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-1 flex justify-between items-center">
            <p className="text-gray-500">
              Manage your tasks efficiently
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 mr-1 text-priority-low" />
              <span>
                {filteredTasks.filter(t => t.completed).length}/{filteredTasks.length} completed
              </span>
            </div>
          </div>
        </header>
        
        <Separator className="my-6" />
        
        {showAddTask && (
          <div className="mb-6">
            <TaskForm onSubmit={handleAddTask} />
          </div>
        )}
        
        <TaskFilters
          filterStatus={filters.status.filterStatus}
          setFilterStatus={filters.status.setFilterStatus}
          filterPriority={filters.priority.filterPriority}
          setFilterPriority={filters.priority.setFilterPriority}
          sortBy={sorting.sortBy}
          setSortBy={sorting.setSortBy}
        />
        
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onReorderTasks={taskActions.reorderTasks}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
};

export default Index;
