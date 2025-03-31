# Task Management App

A modern and responsive task management application built with React and TypeScript.

## Live Demo

The project is deployed on Vercel. You can access it here:

[Task Management App](https://task-management-app-react-sigma.vercel.app/)

## Features

- Create, edit, and delete tasks
- Mark tasks as complete
- Filter and sort tasks by:
  - Status (completed/pending)
  - Date
  - Priority
- Drag and drop functionality for task reordering
- Responsive design for both mobile and desktop
- Local storage persistence

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hriday-sehgal/Task-Management-App-React.git
cd Task-Management-App-React
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Technical Stack

- **Frontend Framework**: React.js
- **Type Safety**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: lucide-react

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/           # React Context for state management
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Usage

1. **Create Task**: Click the "Add Task" button to create a new task
2. **Edit Task**: Click the pencil icon to edit an existing task
3. **Delete Task**: Click the trash icon to delete a task
4. **Mark Complete**: Toggle the checkbox to mark a task as complete
5. **Filter Tasks**: Use the filter options to sort tasks by status, date, or priority
6. **Drag and Drop**: Drag tasks to reorder them

## Contact

For any queries, reach out at:

- **Name:** Hriday Sehgal
- **Email:** hriday.career@gmail.com

## License

Copyright 2025 Hriday Sehgal. All rights reserved.

This project and its source code are the intellectual property of Hriday Sehgal. Unauthorized copying, modification, distribution, or use of this code without explicit permission is strictly prohibited.
