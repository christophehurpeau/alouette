<h1 align="center">
  Alouette is a modern, customizable design system built on top of NativeWind v5. It provides a comprehensive set of components and tools to build consistent, accessible, and performant user interfaces for React and React Native applications.
</h1>

<h3>📦 Packages</h3>

This repository is a monorepo that we manage using [pnpm Workspaces](https://pnpm.io/workspaces).

| Package                                               | Version                                                                                                                              | Description                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [alouette](packages/alouette)                         | <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/v/alouette.svg?style=flat-square"></a>             | A modern, customizable design system built on top of NativeWind v5 with configurable defaults |
| [alouette-icons](packages/alouette-icons)             | <a href="https://npmjs.org/package/alouette-icons"><img src="https://img.shields.io/npm/v/alouette-icons.svg?style=flat-square"></a> | icons for alouette                                                                            |
| [storybook-native-app](packages/storybook-native-app) |                                                                                                                                      |

## 🤖 Using an AI agent?

alouette ships [skills](https://www.npmjs.com/package/@tanstack/intent) that
teach AI coding agents how to use the design system correctly. If you use an AI
agent, run:

```bash
npx @tanstack/intent@latest install
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Prerequisites

- Node.js >= 20.9.0 (includes Corepack for package management)

### Development Setup

1. Enable Corepack (if not already enabled):

```bash
corepack enable
```

2. Clone and install dependencies:

```bash
git clone https://github.com/christophehurpeau/alouette.git
cd alouette
pnpm install
```

3. Start Storybook:

```bash
pnpm storybook
```

### Development Workflow

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linting: `pnpm lint`
5. Submit a PR

### Build Commands

- `pnpm build`: Build all packages
- `pnpm test`: Run tests
- `pnpm lint`: Run linting
- `pnpm storybook`: Start Storybook development server

## 📄 License

ISC © [Christophe Hurpeau](https://christophe.hurpeau.com)
