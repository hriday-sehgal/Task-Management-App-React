
import React from 'react';
import { FilterStatus, FilterPriority, SortOption } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  SortAsc,
  ListFilter,
  Flag,
  Calendar
} from 'lucide-react';

interface TaskFiltersProps {
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  filterPriority: FilterPriority;
  setFilterPriority: (priority: FilterPriority) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg border shadow-sm mb-4">
      <div className="flex flex-wrap gap-1">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('all')}
          className="flex gap-1 items-center"
        >
          <ListFilter className="h-4 w-4" />
          All
        </Button>
        <Button
          variant={filterStatus === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('active')}
          className="flex gap-1 items-center"
        >
          <Clock className="h-4 w-4" />
          Active
        </Button>
        <Button
          variant={filterStatus === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('completed')}
          className="flex gap-1 items-center"
        >
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </Button>
      </div>

      <div className="flex flex-1 flex-col sm:flex-row gap-2">
        <Select 
          value={filterPriority} 
          onValueChange={(value) => setFilterPriority(value as FilterPriority)}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-1">
                <Flag className="h-4 w-4" />
                <span>All Priorities</span>
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-priority-high" />
                <span>High</span>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-priority-medium" />
                <span>Medium</span>
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-priority-low" />
                <span>Low</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={sortBy} 
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">
              <div className="flex items-center gap-1">
                <SortAsc className="h-4 w-4" />
                <span>Date Created</span>
              </div>
            </SelectItem>
            <SelectItem value="dueDate">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </div>
            </SelectItem>
            <SelectItem value="priority">
              <div className="flex items-center gap-1">
                <Flag className="h-4 w-4" />
                <span>Priority</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
