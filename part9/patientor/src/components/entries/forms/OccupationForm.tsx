import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OccupationalHealthcareEntrySchema } from "../schemas";
import { TextField, Input, Button } from "@mui/material";
import { DiagnosisCodeInput } from "./DiagnosisCodeInput";

type FormData = {
  type: "OccupationalHealthcare";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  employerName: string;
};

type Props = {
  addEntry: (entry: FormData) => Promise<void>;
};

export const OccupationForm = ({ addEntry }: Props) => {
  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: zodResolver(OccupationalHealthcareEntrySchema),
    mode: "onChange",
    defaultValues: {
      type: "OccupationalHealthcare",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      sickLeave: {
        startDate: "",
        endDate: "",
      },
      employerName: "",
    },
  });

  const isAddDisalbed = !formState?.isValid;

  const onSubmit = async (formData: FormData) => {
    await addEntry(formData);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 50,
        border: "1px solid #e5e2e2",
        padding: 12,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="Description"
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <Input type="date" value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        control={control}
        name="specialist"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="Specialist"
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="sickLeave.startDate"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="date"
            label="Sick leave start"
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="sickLeave.endDate"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="date"
            label="Sick leave end "
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="employerName"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="text"
            label="Employer name"
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <DiagnosisCodeInput<FormData> name="diagnosisCodes" control={control} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained">CANCEL</Button>
        <Button variant="outlined" type="submit" disabled={isAddDisalbed}>
          ADD
        </Button>
      </div>
    </form>
  );
};
