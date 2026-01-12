# 08. Implement responsive CSS for desktop, tablet, and mobile

meta:
  id: sprint-planner-board-08
  feature: sprint-planner-board
  priority: P2
  depends_on: [sprint-planner-board-07]
  tags: [styling, responsive-design]

## objective
- Implement responsive layout that adapts to different screen sizes
- Desktop: three columns side-by-side
- Tablet: three columns with reduced spacing
- Mobile: stacked columns or horizontal scroll

## deliverables
- Updated component CSS files with media queries
- Responsive behavior validated across breakpoints

## steps
1. Define breakpoints:
   - Desktop: >= 1024px (default)
   - Tablet: 768px - 1023px
   - Mobile: < 768px
2. Update SprintBoard.css:
   - Desktop (default): flex-direction: row, gap: 24px
   - Tablet: flex-direction: row, gap: 16px, adjust column widths
   - Mobile: flex-direction: column or enable horizontal scroll with flex-direction: row + overflow-x
3. Update Column.css:
   - Desktop: min-width: 300px, flex: 1
   - Tablet: min-width: 250px
   - Mobile: full-width or min-width: 280px for horizontal scroll
4. Update TaskCard.css:
   - Ensure cards don't break layout on narrow screens
   - Adjust font sizes for mobile if needed
5. Test at each breakpoint:
   - Desktop: columns side-by-side, comfortable spacing
   - Tablet: columns fit comfortably, reduced spacing
   - Mobile: columns accessible, no horizontal overflow (unless intentional scroll)

## tests
- Manual testing: Resize browser to test breakpoints
- Visual: Use browser DevTools responsive mode
- Validation: Test on actual devices if possible

## acceptance_criteria
- Desktop: three columns side-by-side with adequate spacing
- Tablet: three columns visible with reduced spacing
- Mobile: columns are fully accessible (stacked or scrollable)
- No horizontal overflow on mobile (unless horizontal scroll is design choice)
- Text remains readable at all breakpoints
- Touch targets adequate for mobile (buttons, cards)
- Layout doesn't break at any screen width

## validation
- Manual: Resize browser window from 320px to 1920px width
- DevTools: Test at standard device dimensions (iPhone, iPad, desktop)
- Verify: Layout adapts smoothly, no broken elements
- Test: Drag-and-drop works on touch devices (mobile/tablet)

## notes
- Consider horizontal scroll for mobile as alternative to stacking (Trello-style)
- Ensure adequate touch target sizes on mobile (min 44x44px for buttons)
- Test on actual mobile device if possible for touch interactions
- Use CSS Grid or Flexbox for responsive layouts
- Consider container queries if browser support is adequate
- Ensure priority badges remain visible and readable on mobile
