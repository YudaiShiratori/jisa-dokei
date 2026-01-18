# Claude Code Configuration

## Project Overview

時差時計（Jisa Dokei）- 世界各地の時刻と時差を確認できるクロスプラットフォームモバイルアプリケーション。Expo + React Nativeで構築されています。

## Tech Stack

- **Expo** - React Nativeアプリ開発プラットフォーム
- **Expo Router** - ファイルベースルーティング
- **TypeScript** - 型安全なJavaScript
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - 軽量状態管理
- **date-fns / @date-fns/tz** - 日付/タイムゾーン処理
- **Ultracite** - Biomeベースのリンター/フォーマッター
- **Vitest** - ユニットテストフレームワーク

## Essential Commands

### Package Management
- `bun install` - Install dependencies
- `bun add {packages}` - Add new packages

### Development
- `bun run start` - Start Expo development server
- `bun run ios` - Start iOS simulator
- `bun run android` - Start Android emulator
- `bun run web` - Start web browser

### Code Quality
- `bun run check` - Check code quality with Ultracite
- `bun run check:write` - Auto-fix code issues with Ultracite
- `bun run typecheck` - Run TypeScript type checking

### Testing
- `bun run test` - Run unit tests with Vitest
- `bun run test:watch` - Run tests in watch mode

### GitHub Operations
- `gh issue list` - List GitHub issues
- `gh pr list` - List pull requests
- `gh pr create` - Create new pull request
- `gh issue create` - Create new issue

## Code Style Guidelines

### Coding Principles
- **Readability First**: Code should be easily understandable by other developers
- **Type Safety**: Leverage TypeScript's type system for better development experience
- **Consistent Naming**: Use descriptive names for variables, functions, and components
- **Effective Comments**: Explain "why" not "what" - focus on intent and context

### File Organization
- Use kebab-case for file names (e.g., `use-clock.ts`)
- Place components in `components/` directory
- Place utility functions in `lib/` directory
- Place custom hooks in `hooks/` directory
- Place Zustand stores in `store/` directory
- Mirror test file structure in `__tests__/` directory
- Follow Expo Router conventions for routing (`app/` directory)

### Import/Export Style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Prefer destructuring imports when possible
- Use default exports for pages and main components
- Use named exports for utilities and shared functions
- Use `@/` path alias for imports from project root

### Component Development
- Use TypeScript interfaces for props definition
- Follow React Native best practices
- Use NativeWind (Tailwind CSS) for styling
- Follow dark theme design (app is dark theme only)

## Testing Guidelines

### Test-Driven Development (TDD) - t-wada Style
**MANDATORY**: Always follow t-wada's TDD methodology when implementing new features or fixing bugs.

**Red-Green-Refactor Cycle**:
1. **Red**: Write a failing test that describes the desired behavior
2. **Green**: Write the minimal code that makes the test pass
3. **Refactor**: Improve code quality while keeping tests green

**Core Principles**:
- Never write production code without a failing test first
- Write the simplest code that passes the test (avoid over-engineering)
- Take small, incremental steps (one test case at a time)
- Use descriptive test names that express behavior, not implementation
- Focus on what the code should do, not how it does it

### Unit Testing with Vitest
- Test files should be placed in `__tests__/` directory
- Use `.test.ts` or `.test.tsx` extensions
- Follow Given-When-Then pattern for test structure
- Mock external dependencies appropriately using `vi.mock()`

### Best Practices
- Each test should be independent and isolated
- Use descriptive test names that explain what is being tested
- Test both happy paths and error cases
- Use fixed dates when testing time-related functions

## Project Structure

```
jisa-dokei/
├── __tests__/            # Unit test files
│   ├── hooks/            # Hook tests
│   └── lib/              # Library tests
├── app/                  # Expo Router pages
│   ├── (tabs)/           # Tab navigation
│   │   ├── index.tsx     # World clock tab
│   │   ├── calculator.tsx # Time difference calculator
│   │   └── settings.tsx  # Settings tab
│   ├── _layout.tsx       # Root layout
│   └── add-city.tsx      # Add city screen
├── assets/               # Images and fonts
├── components/           # Reusable components
│   └── ui/               # UI components (Card, etc.)
├── constants/            # Constants (Colors, etc.)
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
│   ├── cities.ts         # City data (463 cities)
│   └── timezone.ts       # Timezone utilities
├── store/                # Zustand stores
│   ├── cities.ts         # Cities state
│   └── settings.ts       # Settings state
├── types/                # TypeScript types
└── ...                   # Config files
```

## Important Notes

- Always run type checking after making changes: `bun run typecheck`
- Use Ultracite for consistent code formatting: `bun run check:write`
- Follow the existing patterns in the codebase for consistency
- This app uses dark theme only (no theme switching)
- The app supports 463 cities across all continents

## Claude AI Guidance

### Custom Instructions for Development
Follow these guidelines when assisting with code generation, reviews, or modifications:

- **Coding Principles**: Prioritize understandability in code. Use meaningful names for variables/functions. Add comments explaining 'why' not 'what'. Format code consistently with proper indentation and grouping.

- **UI/UX Design**: Follow React Native and NativeWind best practices. Use dark theme styling consistently. Ensure proper accessibility.

- **Package Management**: Use bun for all package operations: `bun add {packages}` for adding, `bun install` for dependencies.

- **Testing**: Use Vitest for unit tests. Place tests in __tests__ with .test.ts(x) naming. Ensure test independence, readability (Given-When-Then), proper mocking, assertions, and coverage of error cases.

- **Linting and Formatting**: Use Ultracite via `bun run check:write` for safe fixes.

- **General**: Prevent duplicates by checking existing implementations. Follow TDD (Red-Green-Refactor). Use GitHub CLI for issues/PRs.
