const {insertEntity} = require("../services/tableService");
const joi = require("joi");
const MiddlewareHandler = require("azure-middleware");
const createAnimeHandler = require("./handler");
const {validateBody} = require("../middleware/validator");

const schema = joi.object().keys({
    title: joi.string().required(),
    characters: joi.string().required()
})

const createAnime = new MiddlewareHandler().use((context) => {
    validateBody(context, context.req.body, schema);
    context.next();
}).use(createAnimeHandler).catch((error, context) => {
    context.res = {
        status: 500,
        body: err.message
    };
    context.done();
}).listen();

module.exports = createAnime;