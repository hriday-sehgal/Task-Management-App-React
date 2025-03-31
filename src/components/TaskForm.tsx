
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { Task, Priority } from '@/context/TaskContext';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  initialData?: Partial<Task>;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialData, 
  onCancel,
  isEditing = false
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialData?.dueDate ? new Date(initialData.dueDate) : undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null,
      completed: initialData?.completed || false
    });

    if (!isEditing) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(undefined);
    }
  };

  const clearDueDate = () => {
    setDueDate(undefined);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-4 shadow-sm border animate-fade-in">
      <div>
        <Input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2"
          autoFocus
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none h-24"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <Select value={priority} onValueChange={(val) => setPriority(val as Priority)}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative w-full sm:w-1/2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {dueDate ? format(dueDate, 'PPP') : <span className="text-muted-foreground">Set due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={(date) => {
                  setDueDate(date);
                  setIsOpen(false);
                }}
                initialFocus
              />
              <div className="p-2 border-t">
                <Button variant="outline" className="w-full" onClick={clearDueDate}>
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={!title.trim()}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};
