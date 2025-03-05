# Kanban-style Task Board

This project is a Kanban-style task board built with Next.js, Tailwind CSS, and various other modern web development technologies. It provides a solid foundation for creating a feature-rich and responsive web application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [License](#license)

## Features

- **Kanban Board**: Create, edit, and manage columns and tasks.
- **Drag and Drop**: Reorder columns and tasks using drag-and-drop functionality.
- **Form Validation**: Validate forms using Yup and react-hook-form.
- **State Management**: Manage state using Jotai.
- **Responsive Design**: Built with Tailwind CSS for responsive design.
- **TypeScript**: Type-safe code with TypeScript.
- **Testing**: Unit and integration tests using Jest and React Testing Library.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Jotai**: A primitive and flexible state management library for React.
- **react-hook-form**: A performant, flexible, and extensible form library for React.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **Dnd Kit**: A set of utilities for building complex drag-and-drop interfaces.
- **Lucide Icons**: A collection of simple and customizable icons.
- **Day.js**: A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **React Testing Library**: A library for testing React components.

## Project Structure

```plaintext
Kanban-style-task-board/
├── public/
│   └── ...
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── modules/
│   │   │   ├── column/
│   │   │   │   ├── ColumnCard.tsx
│   │   │   │   ├── ColumnForm.tsx
│   │   │   │   ├── ColumnModal.tsx
│   │   │   ├── task/
│   │   │   │   ├── AddTaskForm.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── DndPortal.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── __tests__/
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── ColorPicker.test.tsx
│   ├── data/
│   │   ├── columns.json
│   │   ├── tasks.json
│   ├── hooks/
│   │   ├── useColumns.ts
│   │   ├── useOutsideClick.ts
│   │   ├── useTasks.ts
│   ├── lib/
│   │   ├── date.ts
│   │   ├── store.ts
│   ├── types/
│   │   ├── column.ts
│   │   ├── task.ts
├── .eslintrc.json
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/next-tailwind-boilerplate.git
    ```
2. Navigate to the project directory:
    ```sh
    cd next-tailwind-boilerplate
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Development Server

Start the development server:
```sh
npm run dev
```
or
```sh
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

Run the tests:
```sh
npm test
```
or
```sh
yarn test
```

## Scripts

- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.
- `format`: Formats the code using Prettier.
- `test`: Runs the test suite.
- `test:watch`: Runs the test suite in watch mode.

## License

Distributed under the MIT License. See `LICENSE` for more information.