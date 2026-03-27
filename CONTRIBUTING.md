# Contributing to xBPP

Thank you for your interest in contributing to xBPP (Execution Boundary Permission Protocol). This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/vanar-xbpp.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Lint check
```

## Pull Request Process

1. Ensure your code builds without errors (`npm run build`)
2. Run the test suite (`npm test`) — all tests must pass
3. Update documentation if you're changing behavior
4. Write descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
5. Open a PR against `main` with a clear description of the change

## What We're Looking For

- **Bug fixes** — Always welcome
- **Test coverage** — Especially for the evaluator and policy logic
- **Documentation** — Spec clarifications, examples, tutorials
- **New policy templates** — Real-world agent spending scenarios
- **Accessibility** — Making the playground and spec pages more accessible
- **Performance** — Bundle size improvements, code splitting

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Tailwind CSS for styling
- Use existing UI components from `src/components/ui/`

## Reporting Issues

Use [GitHub Issues](https://github.com/Big-Immersive/vanar-xbpp/issues) to report bugs or request features. Include:

- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Browser and OS information

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
