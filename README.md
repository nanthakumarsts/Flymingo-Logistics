# Flamingo Workspace

Three-tier architecture:

- client/ - Public frontend website (React + Vite + Tailwind)
- dmin/ - Standalone admin dashboard (React + Vite + Tailwind, port 5174)
- server/ - Backend API (Express.js, port 5000)

## Quick Start

`ash
# Run client
npm run dev:client

# Run admin
npm run dev:admin

# Run server
npm run dev:server
`
