// Import React:
import { useState } from "react";

// Import Types:
import { EntryType, EntryWithoutId } from "../../types";

// Import Components:
import AddHospitalForm from "./AddHospitalForm";
import AddHealthForm from "./addHealthForm";
import AddOccupationalForm from "./AddOccupationalForm";

// Import Material UI Components:
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent } from '@mui/material';

// Props Type:
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

// AddEntryModal Component:
const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {

  const [entryType, setEntryType] = useState<EntryType | ''>('');

  const handleClose = () => {
    onClose();
    setTimeout(() => setEntryType(""), 200);
  };

  const EntryTypeForm = () => {
    switch(entryType) {
      case EntryType.HealthCheck: {
        return <AddHealthForm onSubmit={onSubmit} onCancel={handleClose} />;
      }
      case EntryType.Hospital: {
        return <AddHospitalForm onSubmit={onSubmit} onCancel={handleClose} />;
      }
      case EntryType.OccupationalHealthcare: {
        return <AddOccupationalForm onSubmit={onSubmit} onCancel={handleClose} />;
      }
      default:
        return null;
    }
  };

  const isEntryType = (value: string): value is EntryType => {
    return Object.values(EntryType).includes(value as EntryType);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    if (isEntryType(event.target.value)) {
      setEntryType(event.target.value);
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={handleClose}>
      <DialogTitle>Add New Entry:</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error" style={{ marginBottom: '1.5rem' }}>{error}</Alert>}
        <FormControl fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <InputLabel id="entry-type-label">Entry Type:</InputLabel>
          <Select labelId="entry-type-label" value={entryType} onChange={handleChange} label="Entry Type">
            <MenuItem value="" disabled>Select Entry Type</MenuItem>
            <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
            <MenuItem value={EntryType.Hospital}>Hospital Entry</MenuItem>
            <MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginTop: '1rem' }}>
          {EntryTypeForm()}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Export AddEntryModal Component:
export default AddEntryModal;
