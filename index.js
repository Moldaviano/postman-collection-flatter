exports.postmanCollectionFlatter = function postmanCollectionFlatter(pathToCollection, pathToProcessedCollection) {

    const flattenAndRename = require('./lib/collectionflatter.js');
    const fs = require('fs');

    const collection = JSON.parse(fs.readFileSync(pathToCollection, 'utf8'));

    const processed = collectionFlatter(collection);
    fs.writeFileSync(pathToCollection, JSON.stringify(processed, null, 2));

    // console.log('Successfully processed the collection and saved as processed-postman-collection.json');

};

exports.convertOpenApiToPostmanCollection = function convertOpenApiToPostmanCollection(openApiPath, outputFilePath) {
    const convertOpenApiToPostmanCollection = require('./lib/convertOpenApiToPostmanCollection.js');
    convertOpenApiToPostmanCollection(openApiPath, outputFilePath);
};