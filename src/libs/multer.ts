import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${path.basename(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
