import dotenv from "dotenv";

dotenv.config();

const password = encodeURIComponent(process.env.DB_PASSWORD);
const name = process.env.DB_NAME;
const url = `mongodb+srv://radicluka17_db_user:${password}@cluster0.8fxjf29.mongodb.net/${name}?retryWrites=true&w=majority&appName=Cluster0`;

export const env = {
  db: {
    url,
  },
};
