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
