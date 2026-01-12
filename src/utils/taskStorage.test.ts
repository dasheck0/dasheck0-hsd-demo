import { saveTasks, loadTasks, clearTasks } from './taskStorage';
import { Task } from '../types/Task';

describe('taskStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          priority: 'Medium',
          status: 'todo',
        },
      ];

      saveTasks(tasks);

      const stored = localStorage.getItem('sprintPlannerTasks');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored!)).toEqual(tasks);
    });

    it('should overwrite existing tasks', () => {
      const firstTasks: Task[] = [
        {
          id: '1',
          title: 'First Task',
          priority: 'Low',
          status: 'todo',
        },
      ];
      const secondTasks: Task[] = [
        {
          id: '2',
          title: 'Second Task',
          priority: 'High',
          status: 'done',
        },
      ];

      saveTasks(firstTasks);
      saveTasks(secondTasks);

      const stored = localStorage.getItem('sprintPlannerTasks');
      expect(JSON.parse(stored!)).toEqual(secondTasks);
    });

    it('should handle empty array', () => {
      saveTasks([]);

      const stored = localStorage.getItem('sprintPlannerTasks');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored!)).toEqual([]);
    });
  });

  describe('loadTasks', () => {
    it('should load tasks from localStorage', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          priority: 'Medium',
          status: 'todo',
        },
      ];

      localStorage.setItem('sprintPlannerTasks', JSON.stringify(tasks));

      const loaded = loadTasks();
      expect(loaded).toEqual(tasks);
    });

    it('should return null when localStorage is empty', () => {
      const loaded = loadTasks();
      expect(loaded).toBeNull();
    });

    it('should return null when data is corrupted', () => {
      localStorage.setItem('sprintPlannerTasks', 'invalid json {');

      const loaded = loadTasks();
      expect(loaded).toBeNull();
    });

    it('should return null when data is not an array', () => {
      localStorage.setItem('sprintPlannerTasks', JSON.stringify({ not: 'array' }));

      const loaded = loadTasks();
      expect(loaded).toBeNull();
    });

    it('should handle empty array', () => {
      localStorage.setItem('sprintPlannerTasks', JSON.stringify([]));

      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });
  });

  describe('clearTasks', () => {
    it('should remove tasks from localStorage', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          priority: 'Medium',
          status: 'todo',
        },
      ];

      localStorage.setItem('sprintPlannerTasks', JSON.stringify(tasks));
      expect(localStorage.getItem('sprintPlannerTasks')).not.toBeNull();

      clearTasks();

      expect(localStorage.getItem('sprintPlannerTasks')).toBeNull();
    });

    it('should not throw error when localStorage is already empty', () => {
      expect(() => clearTasks()).not.toThrow();
    });
  });

  describe('saveTasks error handling', () => {
    it('should throw error when localStorage quota exceeded', () => {
      // Mock localStorage.setItem to throw QuotaExceededError
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = jest.fn(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          priority: 'Medium',
          status: 'todo',
        },
      ];

      expect(() => saveTasks(tasks)).toThrow('Storage quota exceeded');

      // Restore original implementation
      Storage.prototype.setItem = originalSetItem;
    });
  });
});
