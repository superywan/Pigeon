import { Pool } from "pg";
import { parse } from "pg-connection-string";

import dotenv from "dotenv";
dotenv.config();

const config = parse(process.env.DATABASE_URL);
config.ssl = {
    rejectUnauthorized: false,
};

const pool = new Pool(config);

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const proConfig = process.env.DATABASE_URL; // heroku PostgreSQL add-on

// const pool = new pg.Pool({
//     connectionString:
//         process.env.NODE_ENV === "production" ? proConfig : devConfig,
//     ssl: { requestCert: true, rejectUnauthorized: false },
// });

export default pool;
