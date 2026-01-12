import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Task, TaskStatus } from '../types/Task';
import { loadTasks, saveTasks } from '../utils/taskStorage';
import { generateDemoTasks } from '../utils/demoData';
import Column from './Column';
import TaskCard from './TaskCard';
import './SprintBoard.css';

/**
 * SprintBoard component is the main container for the Kanban board
 * Manages task state, drag-and-drop, and localStorage persistence
 */
function SprintBoard(): React.JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Configure sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before activating drag
      },
    })
  );

  // Load tasks on mount
  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      // First load: populate with demo data
      const demoTasks = generateDemoTasks();
      setTasks(demoTasks);
      saveTasks(demoTasks);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  /**
   * Adds a new task to the board
   */
  const addTask = (title: string): void => {
    const newTask: Task = {
      id: generateTaskId(),
      title,
      priority: 'Medium',
      status: 'todo',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  /**
   * Handles drag start event
   */
  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  /**
   * Handles drag end event - updates task status
   */
  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    // Update task status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="sprint-board">
      <header className="sprint-board-header">
        <h1 className="sprint-board-title">Sprint Planner</h1>
      </header>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="sprint-board-columns">
          <Column
            title="To Do"
            status="todo"
            tasks={todoTasks}
            onAddTask={addTask}
          />
          <Column
            title="In Progress"
            status="in-progress"
            tasks={inProgressTasks}
            onAddTask={addTask}
          />
          <Column
            title="Done"
            status="done"
            tasks={doneTasks}
            onAddTask={addTask}
          />
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

/**
 * Generates a unique ID for a new task
 */
function generateTaskId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default SprintBoard;
