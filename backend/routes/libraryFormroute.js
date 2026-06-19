const express = require("express");
const multer = require("multer");
const { submitLibraryForm, getLibraryForms } = require("../controllers/libraryFormcontroller.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed!"), false);
    }
  },
});

const router = express.Router();

router.post("/", upload.fields([{ name: "16" }, { name: "17" }]), submitLibraryForm);
router.get("/", getLibraryForms);

module.exports = router;