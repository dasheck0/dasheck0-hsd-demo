import { Task } from '../types/Task';

const STORAGE_KEY = 'sprintPlannerTasks';

/**
 * Saves tasks to localStorage
 * @param tasks - Array of tasks to save
 * @throws Error if localStorage quota exceeded
 */
export function saveTasks(tasks: Task[]): void {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save tasks.');
      throw new Error('Storage quota exceeded');
    }
    console.error('Failed to save tasks:', error);
    throw error;
  }
}

/**
 * Loads tasks from localStorage
 * @returns Array of tasks or null if no data exists or data is corrupted
 */
export function loadTasks(): Task[] | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    
    if (serialized === null) {
      return null;
    }
    
    const parsed = JSON.parse(serialized);
    
    // Validate that parsed data is an array
    if (!Array.isArray(parsed)) {
      console.warn('Invalid data format in localStorage. Expected array.');
      return null;
    }
    
    return parsed as Task[];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return null;
  }
}

/**
 * Clears all tasks from localStorage
 */
export function clearTasks(): void {
  localStorage.removeItem(STORAGE_KEY);
}
