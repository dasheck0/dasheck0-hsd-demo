import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '../types/Task';
import TaskCard from './TaskCard';
import QuickAddTask from './QuickAddTask';
import './Column.css';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (title: string) => void;
}

/**
 * Column component represents a single status column on the board
 * Contains QuickAddTask input and displays all tasks for this status
 */
function Column({ title, status, tasks, onAddTask }: ColumnProps): React.JSX.Element {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <section className={`column ${isOver ? 'column-drag-over' : ''}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <QuickAddTask onAddTask={onAddTask} />

      <div ref={setNodeRef} className="column-content">
        {tasks.length === 0 ? (
          <div className="column-empty-state">
            <p>No tasks yet</p>
            <p className="column-empty-hint">Add a task or drag one here</p>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Column;
