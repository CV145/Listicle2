import pool from './config/db.js';
import destinationData from './data/destinations.js';

async function migrateData() {
    try {
        // Create the table if it doesn't exist
        await pool.query(`
            CREATE TABLE IF NOT EXISTS destinations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                imageUrl TEXT,
                attractions TEXT,
                bestTimeToVisit VARCHAR(255),
                travelTips TEXT,
                averageCost VARCHAR(255)
            )
        `);

        // Insert data into the table
        for (const destination of destinationData) {
            const query = `
                INSERT INTO destinations (name, imageUrl, attractions, bestTimeToVisit, travelTips, averageCost)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            const values = [
                destination.name,
                destination.imageUrl,
                destination.attractions,
                destination.bestTimeToVisit,
                destination.travelTips,
                destination.averageCost
            ];
            await pool.query(query, values);
        }
        console.log('Data migration completed.');
    } catch (error) {
        console.error('Error migrating data:', error);
    } finally {
        pool.end();
    }
}

migrateData();