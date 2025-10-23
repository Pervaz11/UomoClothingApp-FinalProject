import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";
import { extname } from "path";

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (_, file) => {
      const folderPath = folderName.trim();
      const fileExtension = extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;
      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 15 * 1024 * 1024,
    },
    fileFilter: (_, file, cb) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.mimetype)) {
        const err = new Error("Only JPEG, PNG, WebP və GIF images are allowed");
        err.code = "INVALID_FILE_TYPE";
        return cb(err, false);
      }
      cb(null, true);
    },
  });
}

export default uploadMiddleware;
