import type { HospitalEntryType } from "../../types";
import { Card, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
type Props = {
  entry: HospitalEntryType;
};
export const HospitalEntry = ({ entry }: Props) => {
  const { date, description, specialist } = entry;
  return (
    <Card sx={{ padding: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Typography align="center" variant="body1">
          {date}
        </Typography>
        <LocalHospitalIcon />
      </div>
      <Typography align="center" variant="body1">
        {description}
      </Typography>

      <Typography align="center" variant="body1">
        diagnose by {specialist}
      </Typography>
    </Card>
  );
};
