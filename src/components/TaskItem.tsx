
import React, { useState, useRef } from 'react';
import { Task } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskForm } from './TaskForm';
import { format } from 'date-fns';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  isDragging?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onUpdate, 
  onDelete, 
  onToggleComplete,
  isDragging = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleUpdate = (updatedData: Omit<Task, 'id' | 'createdAt'>) => {
    onUpdate(task.id, updatedData);
    setIsEditing(false);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-priority-high';
      case 'medium': return 'bg-priority-medium';
      case 'low': return 'bg-priority-low';
      default: return 'bg-gray-300';
    }
  };

  const getPriorityLabel = () => {
    return task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  };

  if (isEditing) {
    return (
      <div className="my-2" ref={itemRef}>
        <TaskForm 
          onSubmit={handleUpdate} 
          initialData={task} 
          onCancel={() => setIsEditing(false)}
          isEditing
        />
      </div>
    );
  }

  return (
    <div 
      className={`group bg-white border rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${task.completed ? 'bg-gray-50' : ''} animate-slide-in`}
      ref={itemRef}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={() => onToggleComplete(task.id)}
            className="h-5 w-5"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center">
              <span className={`hidden sm:inline-flex text-xs font-medium px-2 py-1 rounded-full text-white ${getPriorityColor()}`}>
                {getPriorityLabel()}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(task.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm text-gray-600 mt-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`inline-flex sm:hidden text-xs font-medium px-2 py-1 rounded-full text-white ${getPriorityColor()}`}>
              {getPriorityLabel()}
            </span>
            
            {task.dueDate && (
              <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
            )}
            
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
