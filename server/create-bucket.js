// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Set region
AWS.config.update({ region: "us-east-2" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Create the parameters for calling createBucket
let bucketParams = {
	Bucket: "user-images-" + uuidv4(),
};

// call s3 to crate the bucket
s3.createBucket(bucketParams, (err, data) => {
	if (err) {
		console.log("Error", err);
	} else {
		console.log("Success");
	}
});
