
import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "You don't have any tasks yet. Add a new task to get started!" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed rounded-lg">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Inbox className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
    </div>
  );
};
