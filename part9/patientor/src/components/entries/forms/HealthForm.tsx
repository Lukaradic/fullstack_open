import { HealthCheckRating, HealthCheckRatingOptions } from "../../../types";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HealthCheckEntrySchema } from "../schemas";
import { TextField, Input, Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DiagnosisCodeInput } from "./DiagnosisCodeInput";

type FormData = {
  type: "HealthCheck";
  healthCheckRating: 0 | 1 | 2 | 3;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
};

type Props = {
  addEntry: (entry: FormData) => Promise<void>;
};

export const HealthForm = ({ addEntry }: Props) => {
  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: zodResolver(HealthCheckEntrySchema),
    mode: "onChange",
    defaultValues: {
      type: "HealthCheck",
      healthCheckRating: HealthCheckRating.Healthy,
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
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
        name="healthCheckRating"
        render={({ field }) => (
          <Select
            id="health-check-rating"
            onChange={field.onChange}
            value={field.value}
          >
            {HealthCheckRatingOptions.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </Select>
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
