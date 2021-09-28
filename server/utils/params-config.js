const { v4: uuidv4 } = require("uuid");

const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: "user-images-fbc4fbf6-592c-45a4-b791-ded3a2e6a799",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
  };

  return imageParams;
};

module.exports = params;
