const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
};

AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

const getAllUsers = (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
      image: req.body.image, // add new image attribute
    },
  };
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data.Items);
    }
  });
};

const getSpecificUserAndData = (req, res) => {
  console.info(`Querying for thought(s) from ${req.params.username}.`);

  const params = {
    TableName: table,
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
      "#img": "image", // image attribute alias
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    ProjectionExpression: "#un, #th, #ca, #img",
    ScanIndexForward: false, // "false" makes the sort order descending
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error(`Unable to query. Error: ${JSON.stringify(err, null, 2)}`);
      res.status(500).json(err); // an error occurred
    } else {
      console.info("Query succeeded.");
      res.json(data.Items);
    }
  });
};

const createUser = (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        `Unable to add item. Error JSON: ${JSON.stringify(err, null, 2)}`
      );
      res.status(500).json(err); // an error occurred
    } else {
      console.info(`Added item: ${JSON.stringify(data, null, 2)}`);
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
};

module.exports = { getAllUsers, getSpecificUserAndData, createUser };
