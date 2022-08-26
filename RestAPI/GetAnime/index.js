const {queryEntity} = require("../services/tableService");
const azure = require('azure-storage');

module.exports = async function (context, req) {

    try {
        const title = context.bindingData.title;
        console.log(title);
        var query = new azure.TableQuery().where("PartitionKey eq ?", title);
        const result = await queryEntity("Anime", query);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
    } catch(err) {
        context.res = {
            status: 500, /* Defaults to 200 */
            body: err.message
        };
    }
}