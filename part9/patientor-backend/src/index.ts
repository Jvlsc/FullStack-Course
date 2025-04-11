// Import Modules:
import express from 'express';
import cors from 'cors';

// Importing Routes:
import diagnosesRouter from './routes/diagnoses';

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

app.use('/api/diagnoses', diagnosesRouter);

// Start Server:
app.listen(PORT, () => {
  console.log(`[Express] Server Running: http://localhost:${PORT}`);
});