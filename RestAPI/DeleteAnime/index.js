const {deleteEntity} = require("../services/tableService");
const azure = require('azure-storage');

module.exports = async function (context, req) {
  
    try {
        
        const {title, id} = context.bindingData;

        const entity = {
            PartitionKey: {"_": title},
            RowKey: {"_": id.toString()}
        }

        let result = await deleteEntity("anime", entity);

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