# Keploy API Test Generation

Use Keploy to record and replay HTTP interactions for the Next.js API routes.

## Prerequisites

- Install Keploy CLI: https://keploy.io/docs/server/quickstart/
- Docker Desktop running (recommended for network capture workflows)

## Record

```bash
npm run keploy:record
```

Run API traffic (Postman, UI actions, or curl) while recording.

## Test Replay

```bash
npm run keploy:test
```

Generated test cases are stored under `keploy/`.
