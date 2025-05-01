# Git Structure

This document outlines the Git structure for this project.

## Branching Strategy

We follow a simplified Git Flow approach:

- `main` - Production code
- `develop` - Development code
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent fixes for production
- `release/*` - Release preparation

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## Pull Requests

- Create a PR with a clear description of the changes
- Link any relevant issues
- Follow the PR template
- Ensure all CI checks pass
- Request reviews from appropriate team members

## Code Reviews

- Be constructive and respectful
- Focus on the code, not the person
- Look for potential bugs, performance issues, and maintainability concerns
- Ensure adherence to project coding standards 