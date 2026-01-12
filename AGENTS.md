# Agent Guidelines for dasheck0-hsd-demo

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

This is a React 19 + TypeScript project bootstrapped with Create React App. It uses react-scripts for build tooling and Jest/React Testing Library for testing.

## Build, Lint & Test Commands

### Development
```bash
npm start              # Start dev server on http://localhost:3000
npm run build          # Production build to /build folder
```

### Testing
```bash
npm test               # Run tests in watch mode (interactive)
npm test -- --watchAll=false  # Run all tests once (CI mode)
npm test -- --testNamePattern="pattern"  # Run tests matching pattern
npm test -- App.test   # Run specific test file (without .tsx extension)
npm test -- --coverage # Run tests with coverage report
```

### Single Test File
To run a single test file:
```bash
npm test -- App.test.tsx
# or just the base name
npm test -- App.test
```

### Linting
ESLint is configured via `eslintConfig` in package.json using `react-app` and `react-app/jest` presets.

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled**: All strict TypeScript checks are enforced
- **Target**: ES5 for broad compatibility
- **JSX**: `react-jsx` (new JSX transform, no need to import React in components)
- **Module**: ESNext with Node resolution
- Always use explicit types for function parameters and return types
- Avoid `any` type; use `unknown` or proper types

### Imports
```typescript
// External dependencies first (React, third-party)
import React from 'react';
import { render, screen } from '@testing-library/react';

// Internal modules (components, utilities)
import App from './App';
import { helper } from './utils/helper';

// Assets last (CSS, images, SVG)
import './App.css';
import logo from './logo.svg';
```

### File Organization
- **Components**: `.tsx` files in `src/`
- **Tests**: `.test.tsx` files colocated with components
- **Styles**: `.css` files colocated with components
- **Types**: Use `.d.ts` for ambient declarations (e.g., `react-app-env.d.ts`)

### Naming Conventions
- **Components**: PascalCase (e.g., `App.tsx`, `MyComponent.tsx`)
- **Files**: Match component name or use camelCase for utilities
- **Functions**: camelCase (e.g., `handleClick`, `fetchData`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `API_URL`)
- **CSS classes**: kebab-case (e.g., `App-header`, `button-primary`)

### React Patterns

#### Function Components
```typescript
// Prefer function components with explicit return type
function App(): JSX.Element {
  return <div>Content</div>;
}

export default App;
```

#### Hooks
- Follow Rules of Hooks (top-level, not in conditions)
- Custom hooks must start with `use` prefix
- Cleanup effects in useEffect return function

#### Props
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps): JSX.Element {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

### Testing with React Testing Library

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './Component';

test('descriptive test name', () => {
  // Arrange
  render(<Component />);
  
  // Act
  const element = screen.getByText(/pattern/i);
  
  // Assert
  expect(element).toBeInTheDocument();
});
```

- Use `screen` queries (e.g., `screen.getByRole`, `screen.getByText`)
- Prefer accessible queries: `getByRole` > `getByLabelText` > `getByText`
- Use `userEvent` for user interactions (not `fireEvent`)
- Setup is done in `src/setupTests.ts` with `@testing-library/jest-dom`

### Error Handling
```typescript
try {
  await fetchData();
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

- Always type error objects properly
- Use `instanceof Error` checks in catch blocks
- Log errors appropriately
- Provide user-friendly error messages in UI

### Type Assertions
```typescript
// Prefer type assertions only when necessary
const element = document.getElementById('root') as HTMLElement;

// Use non-null assertion sparingly
const value = config.apiKey!; // Only if you're 100% certain
```

### Formatting
- Indentation: 2 spaces (not tabs)
- Semicolons: Required
- Quotes: Single quotes for strings (JSX uses double quotes)
- Trailing commas: Use for multiline arrays/objects
- Line length: Aim for 80-100 characters

## Git Workflow

### Commit Messages
This project uses **Conventional Commits** enforced by commitlint:

```
type(scope?): subject

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

Examples:
```
feat(auth): add login component
fix(app): resolve rendering issue on mobile
docs: update README with setup instructions
test(button): add click handler test
```

### Pre-commit Hooks
Lefthook runs commitlint on commit messages automatically.

## Common Patterns

### State Management
```typescript
const [state, setState] = useState<string>('');
```

### Side Effects
```typescript
useEffect(() => {
  // Effect logic
  
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Performance Optimization
- Use `React.memo()` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references

## Best Practices

1. **Always run tests** after making changes
2. **Type everything**: No implicit `any` types
3. **Write tests** for new components and features
4. **Keep components small**: Single responsibility principle
5. **Use semantic HTML**: Improve accessibility
6. **Follow accessibility guidelines**: ARIA labels, keyboard navigation
7. **Clean up effects**: Return cleanup functions from useEffect
8. **Avoid prop drilling**: Consider context for deep props
9. **Keep business logic separate** from presentation components
10. **Document complex logic** with comments

## Files Not to Edit

- `react-app-env.d.ts`: Auto-generated by Create React App
- `reportWebVitals.ts`: Performance measurement utility (modify only if needed)
- `setupTests.ts`: Test configuration (modify to add global test utilities)
