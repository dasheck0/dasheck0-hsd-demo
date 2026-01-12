# 06. Build SprintBoard container with drag-and-drop logic and state management

meta:
  id: sprint-planner-board-06
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-05, sprint-planner-board-02]
  tags: [implementation, component, tests-required]

## objective
- Create SprintBoard container component that orchestrates the entire board
- Implement drag-and-drop logic to move tasks between columns
- Manage task state with localStorage persistence
- Load demo data on first run

## deliverables
- src/components/SprintBoard.tsx - SprintBoard component
- src/components/SprintBoard.css - Component styles
- src/components/SprintBoard.test.tsx - Unit tests

## steps
1. Create SprintBoard.tsx component:
   - Use useState to manage tasks: `const [tasks, setTasks] = useState<Task[]>([])`
   - useEffect on mount to load tasks from localStorage or generate demo data:
     - Call loadTasks()
     - If null/empty, call generateDemoTasks()
     - Set tasks state
   - useEffect to save tasks whenever they change:
     - Call saveTasks(tasks)
   - Implement addTask function:
     - Generate unique ID (crypto.randomUUID() or Date.now().toString())
     - Create new task with title, status: 'todo', priority: 'Medium', default values
     - Add to tasks array, triggers save via useEffect
   - Implement handleDragEnd using @dnd-kit's DndContext:
     - Get active (dragged task ID) and over (target column ID)
     - Find task by active.id
     - Update task status based on over.id
     - Update tasks array, triggers save via useEffect
   - Render DndContext wrapping three Column components
   - Pass filtered tasks to each column (tasks.filter(t => t.status === columnStatus))
2. Create SprintBoard.css:
   - Board container: flex layout, horizontal columns
   - Gap between columns
   - Board title/header (optional)
   - Ensure columns have equal width
3. Use DragOverlay for better drag feedback (optional enhancement)

## tests
- Unit: SprintBoard component
  - Arrange: Mock localStorage utilities, render SprintBoard
  - Act: Wait for component to load
  - Assert: Three columns render (Todo, In Progress, Done)
  - Test: Demo data loads on first render when localStorage empty
  - Test: Existing tasks load from localStorage when available
  - Test: Adding task via QuickAddTask creates new task in Todo column
  - Test: Tasks are saved to localStorage when added
- Integration: Drag-and-drop (may require more complex testing setup)
  - Test: Dragging task updates its status
  - Test: Task moves to correct column after drop

## acceptance_criteria
- Board renders three columns (Todo, In Progress, Done)
- Demo data loads on first run (3-5 tasks)
- Existing tasks load from localStorage on subsequent loads
- Adding task via QuickAddTask creates task in Todo column
- Dragging task between columns updates task status
- All task changes persist to localStorage automatically
- No race conditions in save/load operations
- Component is strongly typed with no `any` types
- No TypeScript errors or warnings

## validation
- Run: `npm test -- SprintBoard.test`
- Run: `npm run build`
- Manual test: Clear localStorage, refresh page, verify demo data
- Manual test: Add task, refresh page, verify task persists
- Manual test: Drag task between columns, verify status updates and persists
- Verify: All tests pass, drag-and-drop works smoothly

## notes
- DndContext should wrap all columns
- Use sensors from @dnd-kit/core for better touch/pointer support
- Consider debouncing localStorage saves for performance (optional)
- Task IDs must be unique strings for @dnd-kit
- handleDragEnd receives DragEndEvent with active and over properties
- Over.id should correspond to column status ('todo', 'in-progress', 'done')
- Consider using droppable areas with useDroppable hook for columns
