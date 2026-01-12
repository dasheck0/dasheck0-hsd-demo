# 03. Build TaskCard component with priority color coding

meta:
  id: sprint-planner-board-03
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-02]
  tags: [implementation, component, tests-required]

## objective
- Create TaskCard component that displays task details with priority-based color coding
- Implement draggable functionality using @dnd-kit/sortable
- Follow Trello-like minimal design with rounded corners and subtle shadows

## deliverables
- src/components/TaskCard.tsx - TaskCard component
- src/components/TaskCard.css - Component styles
- src/components/TaskCard.test.tsx - Unit tests

## steps
1. Create src/components/ directory if it doesn't exist
2. Create TaskCard.tsx component:
   - Accept Task as props
   - Use useSortable hook from @dnd-kit/sortable for drag functionality
   - Display: title, description (if present), assignee (if present), priority badge, due date (if present)
   - Apply priority color to badge or border: High=red (#ef4444), Medium=yellow (#eab308), Low=green (#22c55e)
3. Create TaskCard.css:
   - Card style: white background, rounded corners (8px), subtle shadow
   - Priority badge: small colored pill/tag
   - Typography: clear hierarchy (title bold, description lighter)
   - Hover state: slightly elevated shadow
   - Dragging state: increased opacity, larger shadow
4. Handle optional fields gracefully (don't render if undefined)
5. Format due date as MM/DD/YYYY if present

## tests
- Unit: TaskCard component
  - Arrange: Render TaskCard with full task data
  - Act: Query for title, description, assignee, priority, due date
  - Assert: All elements render correctly
  - Test: Priority badge has correct color class for each priority level
  - Test: Optional fields (description, assignee, due date) don't render when undefined
  - Test: Due date formats correctly (MM/DD/YYYY)

## acceptance_criteria
- TaskCard displays all task properties correctly
- Priority color coding works: High=red, Medium=yellow, Low=green
- Card has Trello-like appearance (rounded corners, shadow)
- Optional fields only render when present
- Draggable functionality works with @dnd-kit
- Component is strongly typed (Task interface)
- No TypeScript errors or warnings

## validation
- Run: `npm test -- TaskCard.test`
- Run: `npm run build`
- Visual: Inspect component in browser with different task data
- Verify: All tests pass, component renders correctly

## notes
- Use semantic HTML: <article> for card container
- Ensure adequate color contrast for accessibility (WCAG AA)
- Priority badge should be visually distinct but not overwhelming
- Consider using <time> element for due date with datetime attribute
- Dragging cursor should change to indicate draggable element
