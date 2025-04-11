// Import Modules:
import express from 'express';
import cors from 'cors';

// Importing Routes:
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

// Constants:
const PORT = 3001;

// Create Express App:
const app = express();

// Middlewares - CORS & JSON Parser:
app.use(cors());
app.use(express.json());

// Route - Ping:
app.get('/api/ping', (_req, res) => {
  console.log('[Express] Ping Received!');
  res.send('pong');
});

// Route - Diagnoses:
app.use('/api/diagnoses', diagnosesRouter);

// Route - Patients:
app.use('/api/patients', patientsRouter);

// Start Server:
app.listen(PORT, () => {
  console.log(`[Express] Server Running: http://localhost:${PORT}`);
});