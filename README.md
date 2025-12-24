# Pedestrian Detection UI

A Vite + React dashboard that simulates an AI pedestrian-detection system with live danger assessment, debug telemetry, and camera 

## DISCLAIMER

THIS PROGRAM WAS MADE BY LLM.

## Quick Start

```bash
docker compose up --build -d
```

This command:

1. Builds the Node 24 image defined in `Dockerfile` (installs npm deps inside `/app`).
2. Starts the `app` service with the source folder mounted into the container for hot reloads.
3. Exposes Vite on <http://localhost:3000>.

### Common Tasks

| Task | Command |
| --- | --- |
| Rebuild after dependency changes | `docker compose build app` |
| View logs | `docker compose logs -f app` |
| Stop/remove containers | `docker compose down` |
| Run arbitrary npm command | `docker compose exec app npm run <script>` |

### Hot Reload Notes

- The `./app` directory is bind-mounted, so editing files locally triggers Vite HMR automatically.
- `CHOKIDAR_USEPOLLING` and `WATCHPACK_POLLING` are enabled in `docker-compose.yml` to ensure file watching works inside Docker for Linux/WSL environments.

### Production Build (Optional)

If you need a static build artifact, run:

```bash
docker compose exec app npm run build
```

Built files will appear under `app/dist/`. Serve them using any static host (e.g., `npm run preview`, nginx, etc.).

---

For development without Docker, you can still run `npm install && npm run dev` inside `app/`, but Docker remains the canonical start path requested for this project.
