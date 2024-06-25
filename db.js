import pg from 'pg';
import env from "dotenv";

env.config();

const db = new pg.Client({
    user: process.env.USER,
    password: process.env.DBPASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: process.env.SSLca,
    },
  });
  
  db.connect();

  export default db;