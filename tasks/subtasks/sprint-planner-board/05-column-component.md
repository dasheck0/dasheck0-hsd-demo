# 05. Build Column component with droppable area

meta:
  id: sprint-planner-board-05
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-03, sprint-planner-board-04]
  tags: [implementation, component, tests-required]

## objective
- Create Column component that renders a single board column with header, tasks, and quick-add
- Implement droppable area using @dnd-kit/sortable
- Display column title and task count

## deliverables
- src/components/Column.tsx - Column component
- src/components/Column.css - Component styles
- src/components/Column.test.tsx - Unit tests

## steps
1. Create Column.tsx component:
   - Props interface:
     - title: string (e.g., "Todo", "In Progress", "Done")
     - status: TaskStatus (for identifying column)
     - tasks: Task[] (filtered tasks for this column)
     - onAddTask: (title: string) => void
   - Use SortableContext from @dnd-kit/sortable to wrap TaskCard list
   - Render column header with title and task count badge
   - Render QuickAddTask at top of column
   - Render TaskCard components for each task
   - Handle empty state: show helpful message when no tasks
2. Create Column.css:
   - Column container: light background, rounded corners, padding
   - Header: bold title, count badge in circle/pill
   - Droppable area: subtle border, min-height to accept drops even when empty
   - Visual feedback: highlight border when dragging over (use @dnd-kit's isOver state)
   - Spacing: consistent gaps between cards
3. Use unique IDs for SortableContext (task.id)

## tests
- Unit: Column component
  - Arrange: Render Column with tasks array and mock onAddTask
  - Act: Query for column title, task cards
  - Assert: Title renders, correct number of TaskCards rendered
  - Test: Empty state message shows when tasks array is empty
  - Test: Task count badge displays correct number
  - Test: QuickAddTask component renders
  - Test: onAddTask callback passes through to QuickAddTask

## acceptance_criteria
- Column displays title and task count correctly
- QuickAddTask renders and functions
- All tasks render as TaskCard components
- Empty state shows helpful message
- Column is droppable (accepts dragged tasks)
- Visual feedback when hovering with dragged task
- Component is strongly typed with explicit prop interface
- No TypeScript errors or warnings

## validation
- Run: `npm test -- Column.test`
- Run: `npm run build`
- Visual: Render column with various task counts (0, 1, many)
- Verify: All tests pass, component renders correctly

## notes
- SortableContext requires unique string IDs for each item
- Empty state message examples: "No tasks yet", "Drag tasks here", "Add a task to get started"
- Consider max-height with scroll for many tasks (prevent column from growing too tall)
- Use semantic HTML: <section> for column container, <h2> for title
- Task count badge helps users see column load at a glance
