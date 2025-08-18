// Name: Shannen G. Pascual
// Section: WD-302

import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Storage object
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage }).single('file');

// Serve static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// Upload form page
app.get('/uploadForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploadForm.html'));
});

// File upload handler
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.end('Error uploading file');
    res.end('File upload successful');
  });
});

// Student page
app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'studentForm.html'));
});

// Admin page
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

app.post('/postAdmin', bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { adminID, firstName, lastName, department } = req.body;
  if (adminID && firstName && lastName && department) {
    res.json({ adminID, firstName, lastName, department });
  } else {
    res.status(400).send('Missing one or more parameters');
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(5001, () => {
  console.log('Server running at http://localhost:5001');
});
