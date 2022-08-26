const {updateEntity} = require("../services/tableService");
const azure = require('azure-storage');

module.exports = async function (context, req) {

    try {
        if(!req.body) {
            context.res = {
                status: 400,
                body: "PLEASE SEND A REQUEST BODY!"
            }
            return;
        }
        
        const {characters} = req.body;
        const {title, id} = context.bindingData;

        if(!characters) {
            context.res = {
                status: 400,
                body: "PLEASE PASS TITLE AND CHARACTERS AS A REQUEST!"
            }
            return;
        }

        const entity = {
            PartitionKey: {"_": title},
            RowKey: {"_": id.toString()},
            characters: {"_": characters},
        }

        if(characters) entity.characters = {"_": characters};

        let result = await updateEntity("anime", entity);

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