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

Assicurati di avere Node.js installato nel tuo sistema.

## 🚀 Installazione

Clona il repository:
```bash
git clone https://github.com/tuo-username/openapi-postman-processor.git
cd openapi-postman-processor
npm install
```

## 💻 Utilizzo

### Flusso completo: da OpenAPI a Postman Collection

1. **Converti la specifica OpenAPI in collezione Postman:**
```bash
openapi2postmanv2 -s open-api.json -o postman-collection.json -p requestNameSource=URL
```

2. **Processa la collezione con lo script di appiattimento:**
```bash
node collectionflatter.js
```

Il file processato sarà salvato come `processed-postman-collection.json`.

### Parametri del comando di conversione

- `-s, --spec`: File di input OpenAPI (es. `open-api.json`, `api.yaml`)
- `-o, --output`: File di output della collezione Postman (es. `postman-collection.json`)
- `-p, --parameter`: Parametri di configurazione (es. `requestNameSource=URL`)

### Opzioni disponibili per `-p`

```bash
requestNameSource=URL      # Usa l'URL come nome della richiesta (consigliato)
requestNameSource=Fallback # Usa fallback se non disponibile
```

## 📖 Come funziona

Lo script `collectionflatter.js` esegue due operazioni principali sulla collezione Postman:

### 1. Rename delle richieste
Trasforma i nomi delle richieste usando il path con metodo HTTP:
```
GET /feedback/manager/summary/{userId}
POST /auth/login
DELETE /user/{id}
```

### 2. Flatten della struttura
Riduce la gerarchia di cartelle da una struttura eccessivamente nidificata:
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
# 1. Converti OpenAPI a Postman Collection
openapi2postmanv2 -s my-api.yaml -o postman-collection.json -p requestNameSource=URL

# 2. Processa e appiattisci la collezione
node collectionflatter.js

# 3. Importa in Postman
# File → Import → processed-postman-collection.json
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