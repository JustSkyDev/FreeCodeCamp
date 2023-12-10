module.exports = (req, res) => {
  const file = req.file;

  if (!file)
    return res.json({
      error: "file not defined, make sure to upload the file first",
    });

  return res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
};
