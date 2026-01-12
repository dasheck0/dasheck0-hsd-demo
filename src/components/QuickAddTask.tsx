import React, { useState } from 'react';
import './QuickAddTask.css';

interface QuickAddTaskProps {
  onAddTask: (title: string) => void;
}

/**
 * QuickAddTask component provides a form for quickly creating new tasks
 * Validates input and supports both Enter key and button click submission
 */
function QuickAddTask({ onAddTask }: QuickAddTaskProps): React.JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      setError('Task title cannot be empty');
      return;
    }

    onAddTask(trimmedTitle);
    setTitle('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form className="quick-add-task" onSubmit={handleSubmit}>
      <div className="quick-add-task-input-wrapper">
        <input
          type="text"
          className={`quick-add-task-input ${error ? 'error' : ''}`}
          placeholder="Add new task..."
          value={title}
          onChange={handleInputChange}
          aria-label="New task title"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'task-input-error' : undefined}
        />
        <button
          type="submit"
          className="quick-add-task-button"
          aria-label="Add task"
        >
          Add
        </button>
      </div>
      {error && (
        <div id="task-input-error" className="quick-add-task-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export default QuickAddTask;
