import type { OccupationalHealthcareEntry } from "../../types";
import { Card, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

type Props = {
  entry: OccupationalHealthcareEntry;
};
export const OccupationalEntry = ({ entry }: Props) => {
  const { date, description, specialist, employerName } = entry;
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
        <WorkIcon /> {employerName}
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
