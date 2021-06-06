import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = {
    connectionString: process.env.DATABASE_URL, // Will come from heroku add-on
};

const pool = new pg.Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

export default pool;
