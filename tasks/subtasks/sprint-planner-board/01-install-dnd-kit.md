# 01. Install and configure @dnd-kit dependencies

meta:
  id: sprint-planner-board-01
  feature: sprint-planner-board
  priority: P1
  depends_on: []
  tags: [setup, dependencies]

## objective
- Install @dnd-kit/core and @dnd-kit/sortable packages for drag-and-drop functionality
- Verify installation and ensure TypeScript types are available

## deliverables
- package.json updated with @dnd-kit dependencies
- package-lock.json updated
- node_modules contains @dnd-kit packages

## steps
1. Install @dnd-kit/core package: `npm install @dnd-kit/core`
2. Install @dnd-kit/sortable package: `npm install @dnd-kit/sortable`
3. Verify installation by checking package.json dependencies
4. Run `npm run build` to ensure TypeScript compilation works with new packages

## tests
- Unit: Not applicable (dependency installation)
- Integration: Verify TypeScript can import @dnd-kit types without errors

## acceptance_criteria
- @dnd-kit/core and @dnd-kit/sortable appear in package.json dependencies
- `npm run build` completes without errors
- TypeScript recognizes @dnd-kit imports (no type errors)

## validation
- Run: `npm list @dnd-kit/core @dnd-kit/sortable`
- Run: `npm run build`
- Verify: Both commands complete successfully with no errors

## notes
- @dnd-kit is recommended in PRD for robust drag-and-drop with TypeScript support
- These packages provide built-in accessibility features (keyboard navigation)
- Core package provides DndContext, DragOverlay components
- Sortable package provides SortableContext, useSortable hook
