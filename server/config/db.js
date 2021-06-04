import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    password: "1422FGf0979!",
    host: "localhost",
    port: 5432,
    database: "twitterclone",
});

export default pool;
