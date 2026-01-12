import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types/Task';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
}

/**
 * TaskCard component displays a task with all its details
 * Includes drag-and-drop functionality via @dnd-kit
 */
function TaskCard({ task }: TaskCardProps): React.JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: task.id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  const getPriorityClass = (priority: string): string => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`task-card-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        {task.assignee && (
          <div className="task-card-assignee">
            <span className="task-card-label">Assignee:</span>
            <span className="task-card-value">{task.assignee}</span>
          </div>
        )}

        {task.dueDate && (
          <div className="task-card-due-date">
            <span className="task-card-label">Due:</span>
            <time className="task-card-value" dateTime={task.dueDate}>
              {task.dueDate}
            </time>
          </div>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
