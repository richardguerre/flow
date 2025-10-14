# Code Conventions and Style Guide

## General Principles

1. **Consistency over personal preference**
2. **Readability over cleverness**
3. **Explicit over implicit**
4. **Don't write tests** (until testing infrastructure is modernized)

## TypeScript Conventions

### No Object Destructuring (Primary Rule)

**Destructuring objects makes code harder to read, trace, and refactor.**

#### ❌ Bad Examples

```tsx
// Bad: Props destructured in function signature
const MyComponent = ({ value, name, onUpdate }) => {
  return <div onClick={onUpdate}>{value} {name}</div>;
};

// Bad: Props destructured in component body
const MyComponent = (props) => {
  const { value, name, onUpdate } = props;
  return <div onClick={onUpdate}>{value} {name}</div>;
};

// Bad: Destructuring function parameters
function calculateTotal({ price, quantity, discount }) {
  return price * quantity * (1 - discount);
}

// Bad: Destructuring in loops
items.forEach(({ id, name }) => {
  console.log(id, name);
});
```

#### ✅ Good Examples

```tsx
// Good: Use props directly
const MyComponent = (props) => {
  return (
    <div onClick={props.onUpdate}>
      {props.value} {props.name}
    </div>
  );
};

// Good: Access object properties directly
function calculateTotal(order) {
  return order.price * order.quantity * (1 - order.discount);
}

// Good: Access array items directly
items.forEach((item) => {
  console.log(item.id, item.name);
});
```

#### Exceptions: When Destructuring IS Allowed

**1. React Hooks (encouraged)**

```tsx
const MyComponent = (props) => {
  // ✅ Destructure hook returns
  const [value, setValue] = useState(props.initialValue);
  const { data, loading } = useQuery(SOME_QUERY);
  const { symbol, format } = useLocaleCurrency();

  return <div>{format(props.price)} {symbol}</div>;
};
```

**2. Array Destructuring (encouraged)**

```tsx
// ✅ Array destructuring is fine
const [first, second, ...rest] = array;
const [x, y] = coordinates;
```

**Why this rule?**
- Makes it obvious where data comes from (`props.value` vs `value`)
- Easier to search and refactor (find all uses of `props.name`)
- Clearer when debugging (stack traces show `props.name`)
- Prevents naming collisions

## React Conventions

### Component Structure

```tsx
import { useState } from "react";
import { graphql, useFragment } from "react-relay";

// 1. Types (if needed)
type Props = {
  dataRef: MyComponent_data$key;
  onUpdate?: () => void;
};

// 2. GraphQL fragments
const fragment = graphql`
  fragment MyComponent_data on SomeType {
    id
    name
    value
  }
`;

// 3. Component definition
const MyComponent = (props) => {
  // 3a. Hooks first
  const data = useFragment(fragment, props.dataRef);
  const [localState, setLocalState] = useState(false);

  // 3b. Derived values
  const displayValue = data.value * 2;

  // 3c. Event handlers
  const handleClick = () => {
    setLocalState(true);
    props.onUpdate?.();
  };

  // 3d. Return JSX
  return (
    <div onClick={handleClick}>
      {data.name}: {displayValue}
    </div>
  );
};

export default MyComponent;
```

### Component Naming

- **PascalCase** for components: `TaskCard`, `DayView`, `SettingsModal`
- **camelCase** for hooks: `useLocaleCurrency`, `useTaskMutations`
- **UPPER_SNAKE_CASE** for GraphQL operations: `TASK_QUERY`, `UPDATE_TASK_MUTATION`

### File Naming

- Components: `TaskCard.tsx`, `DayView.tsx`
- Hooks: `useLocaleCurrency.ts`, `useTaskMutations.ts`
- Utils: `formatDate.ts`, `calculateDuration.ts`
- Types: `types.ts` or inline with usage

## GraphQL Conventions

### Relay Fragments

Always use fragments for component data dependencies:

```tsx
// ✅ Good: Fragment defines component's data needs
const fragment = graphql`
  fragment TaskCard_task on Task {
    id
    title
    completed
    dueDate
  }
`;

const TaskCard = (props) => {
  const task = useFragment(fragment, props.taskRef);
  return <div>{task.title}</div>;
};
```

### Mutation Naming

- Use verb + noun: `updateTask`, `createNote`, `deleteItem`
- GraphQL field names: `updateTask`, `createNote`, `deleteItem`
- Mutation names: `UPDATE_TASK_MUTATION`, `CREATE_NOTE_MUTATION`

### Query Naming

- Descriptive names: `TASKS_QUERY`, `DAY_VIEW_QUERY`, `SETTINGS_QUERY`

## Styling with UnoCSS

### Class Organization

```tsx
// Group related classes, separate with spaces
<div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
  <span className="text-lg font-semibold text-gray-900">
    {props.title}
  </span>
</div>
```

### Conditional Classes

```tsx
// Use template literals or className libraries
<div
  className={`
    base-class
    ${props.active ? "active-class" : "inactive-class"}
    ${props.disabled && "disabled-class"}
  `.trim()}
>
```

Or use a helper (if available):
```tsx
<div className={cn("base-class", props.active && "active-class")}>
```

## Prisma Schema Conventions

### Model Naming

- **PascalCase** singular: `Task`, `Note`, `User`, `RoutineStep`

### Field Naming

- **camelCase**: `createdAt`, `updatedAt`, `completedAt`, `dueDate`

### Relations

```prisma
model Task {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

## File Organization

### Import Order

1. External packages (React, libraries)
2. Internal packages (`@flowdev/*`)
3. Relative imports (components, utils)
4. Types
5. Styles/assets

```tsx
// 1. External
import { useState } from "react";
import { graphql, useFragment } from "react-relay";
import dayjs from "dayjs";

// 2. Internal packages
import { Button } from "@flowdev/ui";

// 3. Relative imports
import { TaskCard } from "../components/TaskCard";
import { formatDate } from "../utils/formatDate";

// 4. Types
import type { Task } from "../types";
```

## Error Handling

### Client-Side

```tsx
// Use optional chaining and nullish coalescing
const value = props.data?.value ?? "default";

// Handle loading and error states explicitly
if (loading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;

return <div>{data.content}</div>;
```

### Server-Side

```typescript
// Throw descriptive errors
if (!task) {
  throw new Error("Task not found");
}

// Use proper HTTP status codes (Elysia)
return new Response("Not found", { status: 404 });
```

## Comments

### When to Comment

- **Complex logic**: Explain "why", not "what"
- **Workarounds**: Note why the workaround exists
- **TODOs**: Include context and issue links

```tsx
// ✅ Good: Explains "why"
// Remove --watch flag because hot-reload breaks plugin installation
const devCommand = "bun run src/index.ts";

// ❌ Bad: Explains "what" (obvious from code)
// Set devCommand to the bun run command
const devCommand = "bun run src/index.ts";
```

### TODO Format

```tsx
// TODO(richard): Fix race condition when installing plugins
// Issue: https://github.com/richardguerre/flow/issues/123
```

## Formatting

### Prettier Configuration

- **Print width**: 100 characters
- **Always format before committing**: `bun run format`
- **Check formatting in CI**: `bun run format:check`

### Manual Formatting Guidelines

When Prettier doesn't help:

```tsx
// Break long argument lists
const result = calculateComplexValue(
  firstLongArgument,
  secondLongArgument,
  thirdLongArgument,
);

// Break long object literals
const config = {
  first: "value",
  second: "another value",
  third: "yet another value",
};
```

## Testing (Current State)

### DO NOT write tests

The testing infrastructure is not currently maintained. Tests will be addressed in a dedicated future PR.

If you need to verify functionality:
1. Manual testing in the UI
2. Check GraphQL playground (`http://localhost:4000/graphql`)
3. Use `console.log` for debugging (remove before committing)

## Commit Messages

Follow conventional commits:

```
feat(web): add dark mode toggle to settings
fix(server): resolve race condition in plugin installation
docs(readme): update setup instructions
refactor(ui): simplify button component API
```

Format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

## Common Pitfalls to Avoid

1. **Don't destructure objects** (except hooks and arrays)
2. **Don't forget to run `bun relay`** after schema changes
3. **Don't commit without formatting** (`bun run format`)
4. **Don't write tests** (not maintained yet)
5. **Don't use `--watch` when installing plugins** (breaks hot-reload)
6. **Don't forget to seed the database** (`bun db:seed`) for realistic testing
