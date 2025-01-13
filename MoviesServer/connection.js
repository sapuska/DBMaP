import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const pgPool = new pg.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
});

export {pgPool};