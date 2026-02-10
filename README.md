# Legal & Compliance Knowledge Assistant — Frontend

Next.js application for the Legal & Compliance Knowledge Assistant. Landing page, app workspace (chat-style Q&A over your documents), and auth flows.

## Tech Stack

- **Next.js 15** (App Router, Turbopack in dev)
- **React 19**
- **Redux Toolkit** + **Redux Persist**
- **Tailwind CSS**
- **Framer Motion**, **Lenis** (smooth scroll), **Lucide React**, **MUI**, **Notistack**

## Prerequisites

- **Node.js** >= 18.17.0
- **npm** >= 9.0.0

## Project Structure

```
src/
  app/                    # Next.js App Router
    app/                  # /app — workspace (chat + documents)
    page.jsx              # / — landing
    login/                # /login
    sign-up/              # /sign-up
  components/             # Feature UI
    landing/              # Landing page sections
    workspace/            # App header, chat, sidebar
    chat/
  provider/               # Redux store + slices (documents, chat)
  common/                  # Shared components, utils, styles
    components/
    styles/
    utils/
```

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server (Turbopack)   |
| `npm run build`| Production build              |
| `npm run start`| Run production server         |
| `npm run lint` | Run ESLint                    |
| `npm run lint:fix` | ESLint with auto-fix      |
| `npm run clean`| Remove `.next`, caches         |

## Environment Variables

Copy the example file and set your backend URL:

```bash
cp .env.local.example .env.local
```

| Variable                 | Description                          |
|--------------------------|--------------------------------------|
| `NEXT_PUBLIC_RAG_API_URL`| Backend API base (e.g. `http://localhost:8000/api/v1`) |

The backend must be running for upload, document list, and Q&A to work.

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and set NEXT_PUBLIC_RAG_API_URL to your backend URL
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

- **/** — Landing page  
- **/app** — Workspace (upload documents, ask questions, view citations)  
- **/login**, **/sign-up** — Auth (if enabled)

## Build & Run (Production)

```bash
npm run build
npm run start
```

Runs on port 3000 by default.

## Docker

From the repo root you can run the whole stack (see root `README.md`). The frontend can also be built with its own Dockerfile:

```bash
docker build -t compliance-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_RAG_API_URL=http://backend:8000/api/v1 compliance-frontend
```

## Features

- **Landing** — Responsive marketing page with Lenis smooth scroll; header with mobile menu.
- **App (/app)** — Chat-style workspace: sidebar (documents, new chat), main area (messages + citations), bottom input with file upload.
- **Responsive** — Layout and typography scale for mobile, tablet, and desktop.

## Browser Support

See `browserslist` in `package.json` (modern browsers; no legacy IE).
