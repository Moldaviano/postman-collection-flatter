const Converter = require('openapi-to-postman');
const fs = require('fs');
const path = require('path'); // Utile per gestire i percorsi

/**
 * Converte un file OpenAPI (YAML/JSON) in una Postman Collection.
 * * @param {string} openApiPath - Percorso del file OpenAPI di input (es. 'api-spec.yaml').
 * @param {string} outputFilePath - Percorso dove salvare il file della Postman Collection (es. 'collection.json').
 * @param {function(Error|null, string|null): void} callback - Callback di Node.js (errore, percorso file salvato).
 */
function convertOpenApiToPostmanCollection(openApiPath, outputFilePath, callback) {
  try {
    // 1. Lettura del file OpenAPI
    const openapi = fs.readFileSync(openApiPath, 'utf8');

    // 2. Conversione
    Converter.convert({ type: 'string', data: openapi }, {}, (err, result) => {
      if (err) {
        return callback(err); // Errore nella conversione
      }

      if (result.result) {
        try {
          // 3. Salvataggio della Postman Collection
          fs.writeFileSync(outputFilePath, JSON.stringify(result.output[0].data, null, 2));
          callback(null, path.resolve(outputFilePath)); // Successo: restituisce il percorso assoluto
        } catch (writeErr) {
          callback(writeErr); // Errore nel salvataggio del file
        }
      } else {
        // Se la conversione non ha avuto successo ma non ha dato un errore formale
        callback(new Error('Conversione fallita: ' + (result.reason || 'Motivo sconosciuto.'))); 
      }
    });

  } catch (readErr) {
    // Errore nella lettura del file OpenAPI
    callback(readErr);
  }
}

// Module export (opzionale se non usi la versione Promise)
module.exports = convertOpenApiToPostmanCollection;