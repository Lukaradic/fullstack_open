import { Entry } from "../../types";
import { OccupationalEntry } from "./OccupationalEntry";
import { HealthEntry } from "./HealthEntry";
import { HospitalEntry } from "./HospitalEntry";

type Props = {
  entries: Entry[];
};

export const Entries = ({ entries }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {entries?.map((entry) => {
        const { type } = entry;
        if (type === "OccupationalHealthcare") {
          return <OccupationalEntry key={entry.id} entry={entry} />;
        }
        if (type === "HealthCheck") {
          return <HealthEntry key={entry.id} entry={entry} />;
        }
        if (type === "Hospital") {
          return <HospitalEntry key={entry.id} entry={entry} />;
        }
      })}
    </div>
  );
};
