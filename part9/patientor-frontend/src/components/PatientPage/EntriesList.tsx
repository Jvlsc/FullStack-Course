// Import MaterialUI Components:
import { Box, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Favorite from '@mui/icons-material/Favorite';

// Import Entry Type:
import { Diagnosis, Entry } from "../../types";

// Custom props Types - EntriesList:
interface EntriesListProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

// Custom props Types - Entry:
interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

// Helper function for exhaustive type checking:
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Diagnosis Codes Component:
const DiagnosisCodes = ({ entry, diagnoses }: EntryProps) => {
  return (
    <ul>
      {entry.diagnosisCodes?.map((code) => {
        const diagnosesName = diagnoses.find((d) => d.code === code)?.name || "";
        return (
          <li key={code}>
            <Typography variant="h6"><strong>{code}</strong> - {diagnosesName}</Typography>
          </li>
        );
      })}
    </ul>
  );
};

// Health Rating Component:
const HealthRating = ({ rating }: { rating: number }) => {
  const colors = {
    0: 'success.main',
    1: 'warning.main',
    2: 'warning.dark',
    3: 'error.main'
  };

  return (
    <Box>
      <Favorite sx={{ color: colors[rating as keyof typeof colors] }} />
    </Box>
  );
};

// Entry Component:
const EntryItem = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box style={{ border: "1px solid #000", padding: "1em", borderRadius: "0.5em" }}>
          <Typography variant="h6">{entry.date}: <LocalHospitalIcon /></Typography>
          <Typography variant="h6">{entry.description}</Typography>
          {entry.diagnosisCodes && <DiagnosisCodes entry={entry} diagnoses={diagnoses} />}
          <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "1em" }}>Diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box style={{ border: "1px solid #000", padding: "1em", borderRadius: "0.5em" }}>
          <Typography variant="h6">{entry.date}: <WorkIcon /> [{entry.employerName}]</Typography>
          <Typography variant="h6">{entry.description}</Typography>
          {entry.diagnosisCodes && <DiagnosisCodes entry={entry} diagnoses={diagnoses} />}
          <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "1em" }}>Diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    case "HealthCheck":
      return (
        <Box style={{ border: "1px solid #000", padding: "1em", borderRadius: "0.5em" }}>
          <Typography variant="h6">{entry.date}: <MedicalServicesIcon /></Typography>
          <Typography variant="h6">{entry.description}</Typography>
          {entry.diagnosisCodes && <DiagnosisCodes entry={entry} diagnoses={diagnoses} />}
          <HealthRating rating={entry.healthCheckRating} />
          <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "1em" }}>Diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

// Entry List Component:
const EntriesList = ({ entries, diagnoses }: EntriesListProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} style={{ marginTop: "1em" }}>
      <Typography variant="h6"><strong>Entries:</strong></Typography>
      {entries.length > 0 
        ? (
          entries.map((entry) => (
            <EntryItem key={entry.id} entry={entry} diagnoses={diagnoses} />
          )) 
        ) : (
          <Typography variant="h6">No entries found</Typography>
        )
      }
    </Box>
  );
};

// Export Entries List Component:
export default EntriesList;

