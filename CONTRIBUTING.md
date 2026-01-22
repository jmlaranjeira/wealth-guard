# Contributing to Wealth Guard

First off, thank you for considering contributing to Wealth Guard! It's people like you that make Wealth Guard such a great tool for managing personal finances.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to jmlaranjeiradeveloper@gmail.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** if possible
- **Include your environment details** (OS, browser version, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible
- **Provide specific examples to demonstrate the steps** or provide mockups/wireframes
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why
- **Explain why this enhancement would be useful** to most Wealth Guard users

### Pull Requests

- Fill in the pull request template
- Follow the TypeScript and React styleguides
- Include screenshots and animated GIFs in your pull request whenever possible
- End all files with a newline
- Avoid platform-dependent code
- Write meaningful commit messages

## Development Process

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/wealth-guard.git
   cd wealth-guard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - ✨ `:sparkles:` when adding a new feature
  - 🐛 `:bug:` when fixing a bug
  - 📝 `:memo:` when writing docs
  - 🎨 `:art:` when improving the format/structure of the code
  - ⚡ `:zap:` when improving performance
  - 🔒 `:lock:` when dealing with security
  - ♻️ `:recycle:` when refactoring code
  - ✅ `:white_check_mark:` when adding tests

### TypeScript Styleguide

- Use TypeScript for all new code
- Prefer interfaces over type aliases for object types
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Avoid `any` types - use `unknown` or proper typing instead
- Use async/await over raw Promises

### React Styleguide

- Use functional components and hooks
- Keep components small and focused on a single responsibility
- Use TypeScript props interfaces
- Prefer named exports over default exports for components
- Use meaningful component and prop names
- Follow the project's folder structure conventions

### CSS/Styling Styleguide

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Keep custom CSS to a minimum
- Use CSS variables for theming when needed

## Project Structure

```
wealth-guard/
├── app/                    # Next.js app directory (routes, layouts)
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── features/          # Feature-specific components
├── lib/                   # Utility functions and helpers
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── ...config files
```

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `duplicate` - This issue or pull request already exists
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `invalid` - This doesn't seem right
- `question` - Further information is requested
- `wontfix` - This will not be worked on

## Questions?

Feel free to open an issue with your question or contact us at jmlaranjeiradeveloper@gmail.com.

---

Thank you for contributing to Wealth Guard! 🎉
