
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3011;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /doc|docx|pdf|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Supported files: Docs (pdf/doc) and Images (jpg/png) only!');
        }
    }
});

// Routes
app.get('/', (req, res) => {
  res.send('ATS Backend Server Running');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'Please upload a file' });
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: `/uploads/${req.file.filename}`,
            filename: req.file.filename
        });
        console.log(`[UPLOAD] File saved: ${req.file.filename}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`[BACKEND] Express Server running on http://localhost:${PORT}`);
});
