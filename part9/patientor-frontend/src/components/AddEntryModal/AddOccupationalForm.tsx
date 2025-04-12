// Import React:
import { useState, SyntheticEvent } from "react";

// Import Material UI Components:
import {  TextField, Grid, Button } from '@mui/material';

// Import Types:
import { EntryWithoutId, Diagnosis, EntryType } from "../../types";

// Props Type:
interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddOccupationalForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryType.OccupationalHealthcare,
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
      }
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
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Sick Leave Start Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Sick Leave End Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default AddOccupationalForm;