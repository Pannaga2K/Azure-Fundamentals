const azure = require('azure-storage');
const tableSvc = azure.createTableService("storageaccountpan1", process.env.AZURE_STORAGE_ACCESS_KEY);

const insertEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.insertEntity(tableName, entity, {echoContent: true, payloadFormat: "application/json;odata=nometadata"}, (err, result, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response.body);
            }
        });
    });
}

const queryEntity = (tableName, query) => {
    return new Promise((resolve, reject) => {
        tableSvc.queryEntities(tableName, query, null, {payloadFormat: "application/json;odata=nometadata"}, (err, result, response) => {
            if(err) {
                reject(err);
            } else {
                resolve(response.body);
            }
        })
    })
}

const updateEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.mergeEntity(tableName, entity, (err, result, response) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

const deleteEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.deleteEntity(tableName, entity, (err, result, response) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

exports.insertEntity = insertEntity;
exports.queryEntity = queryEntity;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;