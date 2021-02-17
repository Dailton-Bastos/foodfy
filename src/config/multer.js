import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { extname, resolve } from 'path';

const uploadFolder = resolve(__dirname, '..', '..', 'temp', 'uploads');

export default {
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (_, file, callback) => {
      return callback(null, uuid() + extname(file.originalname));
    },
  }),

  fileFilter: (_, file, callback) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'];

    isAccepted.find((acceptedFormat) => acceptedFormat === file.mimetype);

    if (isAccepted) callback(null, true);

    return callback(null, false);
  },
};
