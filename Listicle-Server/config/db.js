import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';

// Load environment variables from .env file
const result = dotenv.config();

// Check if .env file is loaded correctly
if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('.env file loaded successfully');
}

console.log('Database Host:', process.env.PGHOST);
console.log('Database Name:', process.env.PGDATABASE);
console.log('Database User:', process.env.PGUSER);
console.log('Database Port:', process.env.PGPORT);

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database');
    release();
});

export default pool;