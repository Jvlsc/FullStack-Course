// Importing React:
import { useEffect, useState } from "react";

// Importing React Router:
import { useParams } from "react-router-dom";

// Importing Patient Service:
import patientService from "../../services/patients";

// Importing Patient Type:
import { Patient } from "../../types";

// Importing Material-UI Components:
import { Box, Divider, Typography } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

// PatientPage Component:
const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    void fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    const patient = await patientService.getById(id);
    setPatient(patient);
  };

  if (!patient) {
    return <div>Loading Patient...</div>;
  }

  return (
    <div style={{ marginTop: "3em" }}>
      <Divider hidden />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h4">{patient.name}</Typography>
          {patient.gender === "male" && <Male />}
          {patient.gender === "female" && <Female />}
          {patient.gender === "other" && <Transgender />}
        </Box>
        <Typography variant="h6">- Gender: {patient.gender}</Typography>
        <Typography variant="h6">- Occupation: {patient.occupation}</Typography>
      </Box>
    </div>
  );
};

// Exporting the PatientPage component:
export default PatientPage;