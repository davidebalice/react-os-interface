# React OS Interface

A web app that recreates the look and feel of a desktop operating system like Windows, built with React.
It has a multi-window system (move, resize, minimize) and an Explorer that browses the real file system of some projects on a server through an API.

**Live demo:** <https://os-interface.davidebalice.dev/>

![Screenshot](https://www.aroundweb.it/screenshot/react-os.jpg)

Backend (file system API): <https://github.com/davidebalice/node-file-system-api>

## Features

- Login screen with clock (demo credentials are prefilled)
- Desktop with icons, taskbar, start menu and clock
- Windows that can be dragged, resized, minimized and brought to the front
- **Server** and **Explorer**: connect to the backend and browse directories and files of real projects
- **Code editor** based on Monaco to view the source of files
- **Settings**: change the desktop background and account options
- **Browser** window, **Calculator**, **Weather** (Open-Meteo API), **Video** and **Audio** players
- Games: **Tetris**, **Space Invaders** and **Dino**
- Demo mode: write operations on the file system are disabled

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for window dragging and animations
- [Monaco Editor](https://github.com/suren-atoyan/monaco-react)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/), [React Icons](https://react-icons.github.io/react-icons/), Font Awesome

## Getting started

### Requirements

- Node.js 18 or later
- npm
- A running instance of [node-file-system-api](https://github.com/davidebalice/node-file-system-api) (or use the public demo API)

### Installation

```bash
git clone https://github.com/davidebalice/react-os-interface.git
cd react-os-interface
npm install
```

### Configuration

API endpoints and demo mode are set in `src/config.js`:

| Key               | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `apiUrl`          | Base URL of the file system API                       |
| `apiUrlFiles` ... | Endpoints for files, directories, create/rename/delete |
| `apiUrlGetUser`   | Endpoint that returns the logged-in user              |
| `demoMode`        | When `true`, write operations are disabled            |

### Available scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the development server on port 3000     |
| `npm run build`   | Create a production build in `dist/`          |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint                                    |

## Project structure

```
src/
├── components/     # Window, desktop, taskbar and all the "apps" (Explorer, Editor, games...)
├── context/        # Global state (windows, background, user)
├── data/           # Window definitions, backgrounds, videos, favorites
├── pages/          # Login screen and main layout
├── utils/          # Axios instance and helpers
└── config.js       # API endpoints and demo mode
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
