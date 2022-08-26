exports.validateBody = async (context, body, schema) => {
    try {
        if(!body) {
            context.res = {
                status: 400,
                body: "REQ IS EMPTY"
            }
            context.done();
            return;
        }

        await schema.validateAsync(body)
    } catch (err) {
        context.res = {
            status: 400,
            body: err.message
        }
        context.done();
    }
}