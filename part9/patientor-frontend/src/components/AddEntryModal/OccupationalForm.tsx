// Import React:
import { useState, SyntheticEvent } from "react";

// Import Types:
import { EntryWithoutId, Diagnosis, EntryType } from "../../types";

// Import Material UI Components:
import { 
  TextField,
  Grid,
  Button, 
  FormControl, 
  Select, 
  MenuItem, 
  OutlinedInput, 
  InputLabel,
  SelectChangeEvent } from '@mui/material';

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

const OccupationalForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
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
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Sick Leave Start Date"
          placeholder="YYYY-MM-DD"
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          style={{ marginBottom: '1rem' }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Sick Leave End Date"
          placeholder="YYYY-MM-DD"
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
          style={{ marginBottom: '1rem' }}
          InputLabelProps={{ shrink: true }}
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

export default OccupationalForm;