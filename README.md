# Task Manager Application

- A task management web application built with React and TypeScript. The application allows users to create, organize, update, and archive tasks across different days through a clean, component-based interface.

- The project focuses on practical React development concepts including custom hooks, Context API, state management, reusable components, asynchronous API requests, and TypeScript typing.

⸻

## Features

* Create tasks and assign them to:
    * Today
    * Tomorrow
    * In two days
* Mark tasks with different statuses
* View detailed task information
* Delete tasks
* Move tasks to task history
* View and delete historical tasks
* Automatically fetch and update task data
* Responsive task organization through reusable React components

⸻

## Data Handling

- The application uses **MockAPI** as a simulated backend.

- Separate API endpoints are used for the different task groups and task history. Axios is used to perform asynchronous HTTP requests for creating, fetching, deleting, and moving tasks.

- A frontend-generated localId is also assigned to each fetched task. This provides a unique identifier for UI interactions because the simulated API can contain identical IDs across different collections.

⸻

## Architecture

- The application uses several React patterns to keep responsibilities separated.

### Custom Hooks

- useTasks manages fetching and state for each task collection.
 
- The same hook is reused for Today, Tomorrow, and In Two Days with different API endpoints.

- useTaskHistory manages fetching and deleting historical tasks.

### Context API

- The TaskProvider combines the three useTasks instances and makes them available throughout the application through React Context.

- This prevents task state and fetch functions from being unnecessarily passed through multiple component levels.

### Component-Based Structure

- The interface is divided into reusable components for task input, task sections, individual tasks, task details, instructions, and task history.

- Task-specific operations such as moving a task to history are separated into utility/API functions where appropriate.

⸻

## Technologies

* React
* TypeScript
* JavaScript (ES6+)
* React Router
* React Context API
* Axios
* Vite
* HTML5
* CSS3
* MockAPI

⸻

## Installation and Setup

1. Clone the repository:
``` bash
git clone https://github.com/Nikolas0209/task-manager.git
```

2. Navigate to the project directory:
``` bash
cd task-manager
```

3. Install dependencies:
``` bash
npm install
```

4. Start the development server:
``` bash
npm run dev
```

⸻

### Project Structure

``` bash
task-manager/
├── public/
├── src/
│   ├── api/                 # API request functions
│   ├── assets/              # Images and other assets
│   ├── components/          # Reusable UI components
│   ├── context/             # React Context and Provider
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level components
│   ├── types/               # Shared TypeScript types
│   ├── utils/               # Reusable application logic
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

⸻

## Project Status

- Finished

- The project is considered complete in its current form. Further improvements may be made as part of future learning and experimentation.

⸻

## Screenshots

![Home Page](https://raw.githubusercontent.com/nikolas0209/Task-Manager-App/main/screenshots/home-page-screenshot-one.png)
![Home Page](https://raw.githubusercontent.com/nikolas0209/Task-Manager-App/main/screenshots/home-page-screenshot-two.png)
![Instructions Panel](https://raw.githubusercontent.com/nikolas0209/Task-Manager-App/main/screenshots/instructions-panel.png)
![Task History Page](https://raw.githubusercontent.com/nikolas0209/Task-Manager-App/main/screenshots/task-history-page.png)

