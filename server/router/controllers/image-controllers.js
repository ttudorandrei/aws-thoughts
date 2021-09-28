const AWS = require("aws-sdk");
const paramsConfig = require("../../utils/params-config");

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

const uploadImage = (req, res) => {
  console.log("post('/api/image-upload'", req.file);
  const params = paramsConfig(req.file);

  s3.upload(params, (err, data) => {
    try {
      res.json(data);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error);
    }
  });
};

module.exports = { uploadImage };
