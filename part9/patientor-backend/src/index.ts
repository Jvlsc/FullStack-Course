// Import Modules:
import express from 'express';
import cors from 'cors';

// Constants:
const PORT = 3001;

// Create Express App:
const app = express();

// Middlewares:
app.use(cors());
app.use(express.json());

// Routes:
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Start Server:
app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});