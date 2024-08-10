import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM destinations');
        console.log(result.rows); // Log the fetched data
        const destinations = result.rows.map(destination => {
            return {
                ...destination,
                attractions: destination.attractions.replace(/[{}]/g, '').split('","').map(attraction => attraction.trim().replace(/^"|"$/g, ''))
            };
        });

        res.status(200).json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;