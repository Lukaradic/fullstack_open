import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HospitalEntrySchema } from "../schemas";
import { TextField, Input, Button } from "@mui/material";
import { DiagnosisCodeInput } from "./DiagnosisCodeInput";

type FormData = {
  type: "Hospital";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
};

type Props = {
  addEntry: (entry: FormData) => Promise<void>;
};

export const HospitalForm = ({ addEntry }: Props) => {
  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: zodResolver(HospitalEntrySchema),
    mode: "onChange",
    defaultValues: {
      type: "Hospital",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      discharge: {
        date: "",
        criteria: "",
      },
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
        name="discharge.date"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="date"
            label="Criteria"
            variant="standard"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="discharge.criteria"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="Criteria"
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
