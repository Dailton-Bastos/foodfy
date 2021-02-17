import ModelFile from '../models/File';

class FileController {
  async create(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await ModelFile.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default FileController;
