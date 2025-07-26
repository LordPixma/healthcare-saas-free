# healthcare-saas-free

This project provides a simplified serverless SaaS platform replicating Radar Healthcare's core modules. The codebase is organized as Python packages suitable for deployment to Cloudflare Workers.

## Modules

- **incident_management** – handle incident recording and tracking
- **risk_register** – manage organizational risks and mitigation actions
- **audit_management** – track audit schedules and findings

Each module currently includes a placeholder implementation so the structure can be expanded easily.

## Audit Module

The `audit` folder contains a lightweight serverless module with endpoints for:

* `POST /audit/forms` - create an audit form with custom questions.
* `PUT /audit/forms/{id}` - edit an existing form.
* `POST /audit/schedule` - schedule an audit.
* `POST /audit/results` - submit audit results, including offline capture support.
* `POST /audit/sync` - sync offline results when back online.

All data is stored locally in JSON files under `audit/data` for simplicity.

## Risk Register Module

This repository includes a simple risk register implemented with serverless functions. Each risk contains:

- `riskId`: unique identifier
- `description`: text description
- `likelihood`: numeric likelihood value
- `impact`: numeric impact value
- `status`: textual status

### Endpoints

- `POST /risks` – create a new risk record
- `PUT /risks/{riskId}` – update an existing risk record
- `GET /risks/{riskId}` – retrieve a risk record

### Local Development

The risk data is stored in `data/risk-db.json`. The handlers can be executed locally using Node:

```bash
node handlers/createRisk.js
```

## Frontend

A simple React application lives in the `frontend` folder. It provides pages to list, create and edit incident records.

### Install dependencies

```bash
cd frontend
npm install
```

### Development server

```bash
npm start
```

This serves the app on [http://localhost:3000](http://localhost:3000).

### Running tests

```bash
npm test
```

Currently this prints `No tests yet` until frontend tests are added.

## Development

Install backend dependencies and run Python tests:

```bash
pip install -r requirements.txt
pytest
```

