# React TypeScript Project with Atomic Design

This is a React 18 project using TypeScript, Ant Design, TailwindCSS, and Vite, structured with Atomic Design principles.

## Tech Stack

- React 18
- TypeScript
- Ant Design
- TailwindCSS
- Vite
- Yarn

## Project Structure

The project follows the Atomic Design methodology with the following structure:

```
src/
├── components/
│   ├── atoms/       # Basic building blocks (buttons, inputs, etc.)
│   ├── molecules/   # Groups of atoms (search forms, etc.)
│   ├── organisms/   # Groups of molecules (headers, etc.)
│   ├── templates/   # Page layouts
│   └── pages/       # Complete pages
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── services/        # API services
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- Yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the app for production
- `yarn preview` - Preview the production build
- `yarn lint` - Run ESLint
- `yarn test` - Run tests (if configured)

## Built With Atomic Design

The project implements the Atomic Design methodology:

1. **Atoms**: Basic UI components like buttons, inputs, and labels
2. **Molecules**: Groups of atoms that form a functional unit
3. **Organisms**: Complex UI components made of molecules and atoms
4. **Templates**: Page layouts without specific content
5. **Pages**: Specific instances of templates with real content

## License

This project is licensed under the MIT License.
