const { insertEntity } = require("../services/tableService");

const createAnimeHandler = async (context, req) => {
    try {
        const {title, characters} = req.body;
        const entity = {
            PartitionKey: {"_": title},
            RowKey: {"_": new Date().getTime().toString()},
            characters: {"_": characters},
        }

        const result = await insertEntity("anime", entity)

        context.res = {
            body: result
        }
        context.done();
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        }
        context.done();
    }
}

module.exports = createAnimeHandler;