// Import React:
import { useState, SyntheticEvent } from "react";

// Import Material UI Components:
import {  TextField, Grid, Button } from '@mui/material';

// Import Types:
import { EntryWithoutId, Diagnosis, EntryType, HealthCheckRating } from "../../types";

// Props Type:
interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddHealthForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryType.HealthCheck,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Diagnosis Codes"
          placeholder="Enter codes separated by commas"
          fullWidth
          value={diagnosisCodes.join(', ')}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Health Check Rating"
          placeholder="Value between 0 and 3"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          style={{ marginBottom: '1rem' }}
        />
        <Grid>
          <Grid item>
            <Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button style={{ float: "right" }} type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddHealthForm;