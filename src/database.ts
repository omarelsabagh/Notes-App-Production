import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

//destructing env variables
const  {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    PG_PORT
} = process.env;


const devComfig = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_PORT}/${POSTGRES_DB}`
const proConfig =  process.env.DATABASE_URL
//creating connection
const Client = new Pool({
    connectionString:proConfig,
});

export default Client;
