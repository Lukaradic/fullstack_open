import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { Patient } from "../types";
import { Typography, CircularProgress } from "@mui/material";
import { Entries } from "./entries/Entries";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { AddEntryForm } from "./entries/forms/AddEntryForm";

const GenderIcon = ({ gender }: { gender: undefined | string }) => {
  if (gender === "male") {
    return <MaleIcon />;
  }
  if (gender === "female") {
    return <FemaleIcon />;
  }
  return null;
};

export const PatientInfo = () => {
  const { id } = useParams();
  const { getById } = patientsService;
  const [data, setData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPatient = useCallback(async () => {
    try {
      if (id) {
        setLoading(true);
        const response = await getById(id);
        if (response) {
          setData(response);
        }
      }
    } catch (err) {
      let message = "";
      if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Failed to get patient data";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [getById, id]);

  useEffect(() => {
    getPatient();
  }, [getPatient, id]);

  const showEntries = Array.isArray(data) && data.length > 0;
  if (error) {
    return (
      <div>
        <h3>{error}</h3>
      </div>
    );
  }

  if (loading && data !== null) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!id) {
    return <div>Can't find id</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 24,
      }}
    >
      <Typography align="center" variant="h4" marginY={4}>
        {data?.name} <GenderIcon gender={data?.gender} />
      </Typography>

      <Typography align="center" variant="body1">
        ssn: {data?.ssn}
      </Typography>
      <Typography align="center" variant="body1">
        occupation: {data?.occupation}
      </Typography>

      <Typography align="center" variant="h6">
        entries
      </Typography>

      <AddEntryForm getPatientAfterEntryAdd={getPatient} patientId={id} />
      {showEntries && <Entries entries={data.entries} />}
    </div>
  );
};
