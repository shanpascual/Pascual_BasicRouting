// Name: Shannen G. Pascual
// Section: WD-302

import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static('public'));

// Page Routes
// home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// student
app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'studentForm.html'));
});

// admin
app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'adminForm.html'));
});

// API Routes
app.get('/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.query;
    if (studentID && firstName && lastName && section) {
        res.json({ studentID, firstName, lastName, section });
    } else {
        res.status(400).send('Missing one or more parameters');
    }
});

app.get('/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.query;
    if (adminID && firstName && lastName && department) {
        res.json({ adminID, firstName, lastName, department });
    } else {
        res.status(400).send('Missing one or more parameters');
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

const server = app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
