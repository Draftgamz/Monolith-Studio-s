# Contributing to Sonic Monolith

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/Monolith-Studio-s.git
   cd Monolith-Studio-s
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bugfix-name` - Bug fixes
- `docs/documentation-changes` - Documentation updates
- `refactor/code-refactoring` - Code refactoring
- `chore/maintenance-tasks` - Maintenance tasks

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(player): add shuffle functionality
fix(sidebar): resolve navigation click issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a branch** from `main`
2. **Make your changes** following the coding guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a PR** with a clear description

## Coding Guidelines

### React Components

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use descriptive component and prop names
- Extract reusable logic into custom hooks

```jsx
// Good
function PlaylistCard({ playlist, onPlay }) {
  const { title, artist, coverUrl } = playlist;
  
  return (
    <div className="playlist-card">
      <img src={coverUrl} alt={`${title} cover`} />
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}
```

### CSS/Styling

- Use CSS variables for colors and common values
- Follow BEM naming convention for complex components
- Keep styles modular and component-scoped
- Use responsive design principles

```css
/* Good */
.playlist-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.playlist-card__cover {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
}
```

### State Management

- Use Context API for global state (player, library, theme)
- Keep local state in components when possible
- Avoid prop drilling by using context appropriately

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (route-level)
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── data/           # Mock data, constants
├── utils/          # Utility functions
└── assets/         # Images, fonts, etc.
```

## Testing

Before submitting a PR:

- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Verify responsive behavior
- [ ] Check keyboard navigation
- [ ] Ensure no console errors or warnings

## Code Review

All PRs require code review. Reviewers will check:

- Code quality and readability
- Adherence to project conventions
- Functionality and bug fixes
- Performance implications
- Accessibility considerations

## Questions?

Feel free to open an issue for any questions or discussions about contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Accept and learn from mistakes
- Focus on what's best for the community
