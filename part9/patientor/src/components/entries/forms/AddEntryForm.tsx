import React, { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { EntryFormBody } from "../../../types";
import { HealthForm } from "./HealthForm";
import patientsService from "../../../services/patients";
import { HospitalForm } from "./HospitalForm";
import { OccupationForm } from "./OccupationForm";

type EntryTypes = "hospital" | "occupation" | "health";

const entryTypes: EntryTypes[] = ["hospital", "occupation", "health"];

type Props = {
  getPatientAfterEntryAdd: () => Promise<void>;
  patientId: string;
};
export const AddEntryForm = ({ getPatientAfterEntryAdd, patientId }: Props) => {
  const [entryType, setEntryType] = useState<EntryTypes>("hospital");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType(e.target.value as EntryTypes);
  };

  const addEntry = async (entry: EntryFormBody) => {
    try {
      if (!patientId) {
        return;
      }
      await patientsService.addEntry(patientId, entry);
      getPatientAfterEntryAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Entry Type
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={entryType}
          onChange={handleChange}
        >
          {entryTypes.map((type) => (
            <FormControlLabel value={type} control={<Radio />} label={type} />
          ))}
        </RadioGroup>
      </FormControl>

      {entryType === "health" && <HealthForm addEntry={addEntry} />}
      {entryType === "hospital" && <HospitalForm addEntry={addEntry} />}
      {entryType === "occupation" && <OccupationForm addEntry={addEntry} />}
    </div>
  );
};
