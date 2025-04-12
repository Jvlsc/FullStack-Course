// Importing React & General Tools:
import { useEffect, useState } from "react";
import axios from "axios";

// Importing React Router:
import { useParams } from "react-router-dom";

// Importing Patient Service:
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

// Importing Patient Type:
import { Patient, Diagnosis, EntryWithoutId } from "../../types";

// Import Components:
import EntriesList from "./EntriesList";
import AddEntryModal from "../AddEntryModal";

// Importing Material-UI Components:
import { Box, Divider, Typography, Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

// PatientPage Component:
const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    void fetchPatient();
    void fetchDiagnosis();
  }, [id]);

  const fetchPatient = async () => {
    const patient = await patientService.getById(id);
    setPatient(patient);
  };

  const fetchDiagnosis = async () => {
    const diagnoses = await diagnosisService.getAll();
    setDiagnoses(diagnoses);
  };
  
  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const updatedPatient = await patientService.createEntry(id, values);
        setPatient(updatedPatient);
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient || !diagnoses) {
    return <div>Loading Patients data...</div>;
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
        <Typography variant="h6">- SSN: {patient.ssn}</Typography>
        <Typography variant="h6">- Occupation: {patient.occupation}</Typography>
      </Box>
      <div style={{ marginTop: "1.5em", marginBottom: "1.5em" }}>
        <AddEntryModal diagnoses={diagnoses} modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} error={error} />
        <Button variant="contained" onClick={openModal}>Add Entry</Button> 
      </div>
      <div>
        <EntriesList entries={patient.entries} diagnoses={diagnoses} />
      </div>
    </div>
  );
};

// Exporting the PatientPage component:
export default PatientPage;