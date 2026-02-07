import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckRating } from "../../types";

export const Rating = ({ rating }: { rating: number }) => {
  if (rating === HealthCheckRating.Healthy) {
    return <FavoriteIcon color="success" />;
  }
  if (rating === HealthCheckRating.LowRisk) {
    return <FavoriteIcon color="warning" />;
  }
  return null;
};
