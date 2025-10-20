# OpenAPI to Postman Collection Processor

Un tool per convertire specifiche OpenAPI in collezioni Postman con una struttura pulita e organizzata, riducendo il nesting eccessivo e usando i path come nomi delle richieste.

## 🎯 Caratteristiche

- ✨ **Appiattimento automatico** - Riduce la gerarchia di cartelle a massimo 2 livelli
- 🏷️ **Path come nomi** - Usa il path dell'endpoint invece del summary (es. `GET /feedback/manager/summary/{userId}`)
- 📁 **Struttura pulita** - Organizza le richieste in modo logico eliminando il nesting eccessivo
- 🚀 **Facile da usare** - Script standalone o integrabile nel tuo workflow

## 📋 Prerequisiti

```bash
npm install -g openapi-to-postman
```

## 🚀 Installazione

Clona il repository:
```bash
git clone https://github.com/tuo-username/openapi-postman-processor.git
cd openapi-postman-processor
npm install
```

## 💻 Utilizzo

### Metodo 1: Script standalone

1. Converti la tua specifica OpenAPI in collezione Postman:
```bash
openapi2postmanv2 -s api-spec.yaml -o collection.json
```

2. Processa la collezione:
```bash
node process-collection.js
```

Il file processato sarà salvato come `collection-processed.json`.

### Metodo 2: Conversione e processamento integrati

```javascript
const Converter = require('openapi-to-postman');
const fs = require('fs');

const options = {
  folderStrategy: 'Tags'
};

Converter.convert(
  { type: 'file', data: 'api-spec.yaml' },
  options,
  (err, result) => {
    if (result.result) {
      const collection = result.output[0].data;
      const processed = flattenAndRename(collection);
      fs.writeFileSync('collection.json', JSON.stringify(processed, null, 2));
      console.log('✅ Collection creata e processata!');
    } else {
      console.error('❌ Errore nella conversione:', err);
    }
  }
);

// Includi qui la funzione flattenAndRename
```

## 📖 Come funziona

Lo script esegue due operazioni principali:

### 1. Rename delle richieste
Trasforma i nomi delle richieste da summary (es. "Get user summary") a path con metodo HTTP:
```
GET /feedback/manager/summary/{userId}
POST /auth/login
DELETE /user/{id}
```

### 2. Flatten della struttura
Riduce la gerarchia di cartelle da questa struttura eccessivamente nidificata:
```
feedback/
  └── manager/
      └── summary/
          └── {userId}/
              └── GET Milestone 3
```

A una struttura pulita a 2 livelli:
```
Feedback/
  ├── GET /feedback/manager/summary/{userId}
  ├── POST /feedback/create
  └── DELETE /feedback/{id}
```

## ⚙️ Personalizzazione

Puoi modificare la funzione `flattenAndRename` per adattarla alle tue esigenze:

**Cambiare il formato dei nomi:**
```javascript
// Esempio: usa solo il path senza metodo HTTP
item.name = `/${path}`;

// Esempio: aggiungi operationId se disponibile
item.name = item.request.description 
  ? `${method} ${item.request.description}` 
  : `${method} /${path}`;
```

**Modificare la profondità del flatten:**
```javascript
// Per mantenere 3 livelli invece di 2, modifica la logica in processItem
```

## 🔧 Opzioni avanzate

### Configurare la conversione OpenAPI

```javascript
const options = {
  folderStrategy: 'Tags',           // 'Tags' o 'Paths'
  requestNameSource: 'URL',         // 'URL', 'Fallback'
  optimizeConversion: true,
  stackLimit: 10
};
```

## 📝 Esempio completo

```bash
# 1. Converti OpenAPI
openapi2postmanv2 -s my-api.yaml -o collection.json

# 2. Processa
node process-collection.js

# 3. Importa in Postman
# File → Import → collection-processed.json
```

## 🤝 Contribuire

Contributi, issues e feature requests sono benvenuti!

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## 👤 Autore

Il tuo nome - [@tuo-twitter](https://twitter.com/tuo-twitter)

Repository: [https://github.com/tuo-username/openapi-postman-processor](https://github.com/tuo-username/openapi-postman-processor)

## 🙏 Ringraziamenti

- [openapi-to-postman](https://github.com/postmanlabs/openapi-to-postman) - Il convertitore base
- Postman - Per l'ottima API platform

## ⭐ Supporto

Se questo progetto ti è stato utile, considera di lasciare una stella ⭐️!