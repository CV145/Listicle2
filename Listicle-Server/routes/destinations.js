import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import destinationData from '../data/destinations.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(destinationData)
});

export default router;