const {queryEntity} = require("../services/tableService");
const azure = require('azure-storage');

module.exports = async function (context, req) {
    try {
        const {title, id} = context.bindingData;
        var query = new azure.TableQuery().where("PartitionKey eq ? and RowKey eq ?", title, id.toString());
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