import { Controller, Control, FieldValues, Path } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import diagnosis from "../../../data/diagnoses";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export const DiagnosisCodeInput = <T extends FieldValues>({
  name,
  control,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select multiple onChange={field.onChange} value={field.value}>
          {diagnosis.map((code) => (
            <MenuItem key={code.code} value={code.code}>
              {code.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};
