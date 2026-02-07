import type { HealthCheckEntry } from "../../types";
import { Card, Typography } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Rating } from "./Rating";

type Props = {
  entry: HealthCheckEntry;
};
export const HealthEntry = ({ entry }: Props) => {
  const { date, description, specialist, healthCheckRating } = entry;
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
        <HealthAndSafetyIcon />
      </div>
      <Typography align="center" variant="body1">
        {description}
      </Typography>

      <Typography align="center" variant="body1">
        diagnose by {specialist}
      </Typography>
      <Rating rating={healthCheckRating} />
    </Card>
  );
};
