// Import React:
import { useState, SyntheticEvent } from "react";

// Import Material UI Components:
import {  TextField, Grid, Button, MenuItem, Select, FormControl, OutlinedInput, InputLabel, SelectChangeEvent } from '@mui/material';

// Import Types:
import { EntryWithoutId, Diagnosis, EntryType, HealthCheckRating } from "../../types";

// Menu Diagnosis Codes Props:
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Props Type:
interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const HealthForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
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

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: { value } } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: '1rem' }}
          InputLabelProps={{ shrink: true }}
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
        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
          <InputLabel id="code-name-label">Diagnosis Codes</InputLabel>
          <Select 
            labelId="code-name-label" 
            id="code-name" 
            multiple 
            value={diagnosisCodes} 
            input={<OutlinedInput label="Diagnosis Codes" />} 
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Health Check Rating"
          placeholder="Value between 0 and 3"
          type="number"
          inputProps={{ min: HealthCheckRating.Healthy, max: HealthCheckRating.CriticalRisk }}
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

export default HealthForm;