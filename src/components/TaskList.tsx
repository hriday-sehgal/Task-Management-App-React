
import React, { useState } from 'react';
import { Task } from '@/context/TaskContext';
import { TaskItem } from './TaskItem';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onReorderTasks: (startIndex: number, endIndex: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleComplete,
  onReorderTasks 
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;
    
    onReorderTasks(sourceIndex, destinationIndex);
  };

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                      onToggleComplete={onToggleComplete}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
