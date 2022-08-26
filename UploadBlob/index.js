const {main} = require("./e1/azure-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    var blobDetails = await main(name);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: blobDetails
    };
}