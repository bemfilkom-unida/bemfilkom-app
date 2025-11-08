# Contributing to BEM FILKOM UNIDA Website

Thank you for your interest in contributing to the BEM FILKOM UNIDA website! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended)
- Git

### Setup Development Environment
1. **Fork the repository**
   ```bash
   # Fork the repository on GitHub, then clone
   git clone https://github.com/aliimndev/bem-filkom-unida.git
   cd bem-filkom-unida
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
4. **Start development server**
   ```bash
   pnpm dev
   ```

## 📝 How to Contribute

### 1. Reporting Issues
- Use GitHub Issues to report bugs or request new features
- Provide a clear description and reproduction steps for bugs
- Use appropriate labels (bug, enhancement, documentation)

### 2. Code Contributions

#### Workflow:
1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```
2. **Make changes**
   - Follow existing coding standards
   - Test your changes
   - Update documentation if necessary
3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with..."
   ```
4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### 3. Coding Standards

#### TypeScript/React
- Use TypeScript for all files
- Follow React best practices
- Use functional components with hooks
- Proper prop types and interfaces

#### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design for all components
- Support dark mode where applicable

#### Code Formatting
```bash
# Format code before committing
pnpm format.fix
# Type check
pnpm typecheck
```

### 4. Commit Message Convention
Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for refactoring
- `test:` for tests
- `chore:` for maintenance

Examples:
```
feat: add particles background animation
fix: resolve email sending issue
docs: update README with installation steps
```

## 🎨 Design Guidelines

### Visual Design
- Follow BEM FILKOM UNIDA brand guidelines
- Use the defined color palette
- Maintain consistency with existing designs
- Mobile-first approach

### Animation Guidelines
- Smooth and performant animations
- Respect `prefers-reduced-motion` setting
- Use Framer Motion for complex animations
- Keep animations subtle and purposeful

## 🧪 Testing

### Manual Testing
- Test across browsers (Chrome, Firefox, Safari)
- Test responsive design on various devices
- Test accessibility with screen readers
- Test performance with DevTools

### Automated Testing
```bash
# Run tests
pnpm test
# Type checking
pnpm typecheck
```

## 📚 Documentation

### Code Documentation
- Comment complex logic
- Use JSDoc for functions and components
- README for each major feature
- Update the main README for significant changes

### API Documentation
- Document all API endpoints
- Include request/response examples
- Error handling documentation

## 🐛 Bug Reports
When reporting a bug, include:
1. **Environment**
   - OS and version
   - Browser and version
   - Node.js version
2. **Steps to Reproduce**
   - Clear steps
   - Expected vs. actual behavior
3. **Additional Context**
   - Screenshots if applicable
   - Console errors
   - Network requests if relevant

## ✨ Feature Requests
When requesting a new feature:
1. **Problem Description**
   - What problem does it solve?
   - Why is this feature needed?
2. **Proposed Solution**
   - Description of the proposed solution
   - Mockups or wireframes if available
3. **Alternatives**
   - Alternatives considered

## 🔍 Review Process

### Pull Request Guidelines
- PRs must have a clear description
- Link to relevant issues
- Screenshots for UI changes
- Test results

### Review Checklist
- [ ] Code follows project standards
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Performance considerations

## 📞 Getting Help

### Communication Channels
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for general questions
- Email: bem.filkom@unida.ac.id for urgent matters

### Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🎉 Recognition
Contributors will be recognized in:
- README contributors section
- Release notes
- Website credits (if applicable)

## 📄 License
By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the advancement of BEM FILKOM UNIDA! 🚀
