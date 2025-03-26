# The Phonebook Project:

The exercises corresponding to this project are:

- **Exercise 2.6**: The Phonebook (Step 1).
- **Exercise 2.7**: The Phonebook (Step 2).
- **Exercise 2.8**: The Phonebook (Step 3).
- **Exercise 2.9**: The Phonebook (Step 4).
- **Exercise 2.10**: The Phonebook (Step 5).
- **Exercise 2.11**: The Phonebook (Step 6).
- **Exercise 2.12**: The Phonebook (Step 7).
- **Exercise 2.13**: The Phonebook (Step 8).
- **Exercise 2.14**: The Phonebook (Step 9).
- **Exercise 2.15**: The Phonebook (Step 10).
- **Exercise 2.16**: The Phonebook (Step 11).
- **Exercise 2.17**: The Phonebook (Step 12).

---
---

## Quick Start:

**Install dependencies:**

```bash
npm install
```

**Run the project (dev mode):**

```bash
npm run dev
```

**Build the project:**

```bash
npm run build
```

---
---

## Backend:

This frontend is ready to be embedded into the backend project. In development mode, `Vite` will automatically proxy requests to a localhost backend server. See `vite.config.js` for the proxy configuration:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})

```

This will proxy any request to the `/api` endpoint to the `http://localhost:3001/api` local backend server.

---
---

## JSON Server Backend:

A quick way to start a backend is to use the `json-server` package already installed in the project. There is an available command to start the server in the `package.json` file:

```bash
npm run server
```

This command will launch the `json-server` with the `db.json` file located in the root of the project. This server will provide a fake REST API for the frontend to consume in `/persons` endpoint. 

Don't forget to adapt the `vite.config.js` file to the proxy configuration to remove the `/api` prefix:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
})
```

---
---