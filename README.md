<h1 align="center">
  Alouette is a modern, customizable design system built on top of Tamagui. It provides a comprehensive set of components and tools to build consistent, accessible, and performant user interfaces for React and React Native applications.
</h1>

<h3>📦 Packages</h3>

This repository is a monorepo that we manage using [Yarn Workspaces](https://yarnpkg.com/features/workspaces).

| Package                                   | Version                                                                                                                              | Description                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [alouette](packages/alouette)             | <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/v/alouette.svg?style=flat-square"></a>             | A modern, customizable design system built on top of Tamagui with configurable defaults |
| [alouette-icons](packages/alouette-icons) | <a href="https://npmjs.org/package/alouette-icons"><img src="https://img.shields.io/npm/v/alouette-icons.svg?style=flat-square"></a> | icons for alouette                                                                      |
| [storybook-app](packages/storybook-app)   |                                                                                                                                      | storybook for alouette                                                                  |

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
yarn install
```

3. Start Storybook:

```bash
yarn storybook
```

### Development Workflow

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `yarn test`
4. Run linting: `yarn lint`
5. Submit a PR

### Build Commands

- `yarn build`: Build all packages
- `yarn test`: Run tests
- `yarn lint`: Run linting
- `yarn storybook`: Start Storybook development server

## 📄 License

ISC © [Christophe Hurpeau](https://christophe.hurpeau.com)
