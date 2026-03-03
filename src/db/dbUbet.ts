import { Pool } from "pg";
const poolUbet = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sankodb",
  password: "admin",
  port: 5432,
});

export default poolUbet;
