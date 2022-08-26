const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()
const axios = require('axios');

async function main(name) {
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    console.log(AZURE_STORAGE_CONNECTION_STRING);
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string OR name not found");
    }
    var blobDetails = {
        containerName: "",
        blobName: "",
        data: "",
        blobs: []
    };

    var jsonData = await axios.get('https://random-data-api.com/api/v2/users');

    // CREATE CONTAINER
    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    
    // Create a unique name for the container
    const containerName = "postjsondata2";
    blobDetails.containerName = containerName;
    console.log("\nCreating container...", containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create the container
    const createContainerResponse = await containerClient.create();
    console.log("Container was created successfully.");

    // UPLOAD BLOB
    // Create a unique name for the blob
    const blobName = "data.json";
    blobDetails.blobName = blobName;
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload data to the blob
    const data = {
        "username": name
    };
    blobDetails.data = data;
    // const uploadBlobResponse = await blockBlobClient.upload(JSON.stringify(data), JSON.stringify(data).length);
    const uploadBlobResponse = await blockBlobClient.upload(JSON.stringify(jsonData.data), JSON.stringify(jsonData.data).length);
    console.log("Blob was uploaded successfully.");

    console.log(blobDetails)
    return jsonData.data;

}

// Convert stream to text
async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
}

exports.main = main;