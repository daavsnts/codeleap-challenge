# CodeLeap Network

A frontend technical challenge built with modern React ecosystem tools, focusing on clean architecture and developer experience.

## About

This project is a social network-style application where users can create, edit, and delete posts. The implementation prioritizes code organization, type safety, and a polished user experience while maintaining simplicity.

The tech stack was chosen to reflect current industry standards: React 19 with React Router 7 for the framework, TanStack Query for server state, Zustand for client state, and TailwindCSS for styling.

## Demo

A live version of the application is available for testing at:

**https://codeleap-challenge-rho.vercel.app**

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| Framework | React 19 + React Router 7 |
| Styling | TailwindCSS 4 |
| Server State | TanStack React Query |
| Client State | Zustand (with persistence) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | Sonner |
| Code Quality | Biome |

## Features

- User authentication with persistent sessions
- Create new posts with title and content
- Edit your own posts
- Delete your own posts
- Responsive layout for mobile and desktop
- Loading states with skeleton placeholders
- Toast notifications for user feedback
- Mobile safe area support

## Project Structure

```
app/
├── components/     # UI components organized by feature
│   ├── main/       # Main page components (posts, dialogs)
│   ├── sign-up/    # Authentication components
│   └── ui/         # Reusable UI primitives
├── hooks/          # Custom React hooks
├── stores/         # Zustand state stores
├── services/       # API layer (fetch, models, mappers)
├── routes/         # React Router route components
├── utils/          # Utility functions
└── lib/            # Shared libraries
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/daavsnts/codeleap-challenge.git
cd codeleap-challenge
```

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open http://localhost:5173 in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Create production build |
| `bun start` | Serve production build |
| `bun run typecheck` | Run TypeScript type checking |

## Acknowledgments

Thank you to **CodeLeap** for the opportunity to participate in this technical challenge. It was a great experience to build this project and demonstrate my skills with modern React development.

## Author

**Davi Santos**

- [GitHub](https://github.com/daavsnts)
- [LinkedIn](https://linkedin.com/in/daavsnts)
