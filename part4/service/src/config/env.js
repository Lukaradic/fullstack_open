import dotenv from "dotenv";

dotenv.config();
const environment = process.env.NODE_ENV;
const password = encodeURIComponent(process.env.DB_PASSWORD);
let url, db_name;
(function () {
  switch (environment) {
    case "development":
      db_name = process.env.DB_NAME_DEV;
      break;
    case "test":
      db_name = process.env.DB_NAME_TEST;
      break;
    default:
      db_name = process.env.DB_NAME_DEV;
  }
  url = `mongodb+srv://radicluka17_db_user:${password}@cluster0.8fxjf29.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;
})();

export const env = {
  db: {
    url,
  },
};
