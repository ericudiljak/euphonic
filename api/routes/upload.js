// upload.js
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 1 }]), (req, res) => {
  // Access files using req.files
  const imageFile = req.files['image'][0]; // Assuming only one file is uploaded
  const musicFile = req.files['music'][0]; // Assuming only one file is uploaded
  // Process and save these files to appropriate locations

  res.json({ message: 'Files uploaded successfully' });
});

export default router;
