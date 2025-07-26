# healthcare-saas-free


Free serverless SaaS replicating Radar Healthcare's core modules (incident management, risk register, audit).

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

Unit tests can be run with:

```bash
npm test
```
=======
This project provides a simplified serverless SaaS platform replicating Radar Healthcare's core modules. The codebase is organized as Python packages suitable for deployment to Cloudflare Workers.

## Modules

- **incident_management** – handle incident recording and tracking
- **risk_register** – manage organizational risks and mitigation actions
- **audit_management** – track audit schedules and findings

Each module currently includes a placeholder implementation so the structure can be expanded easily.

## Development

Install dependencies and run tests:

```bash
pip install -r requirements.txt
pytest
```

## Deployment

Deployment to Cloudflare Workers is handled through GitHub Actions with the configuration found in `.github/workflows/deploy.yml`. The [`wrangler.toml`](./wrangler.toml) file defines the Cloudflare project settings.
=======
Free serverless SaaS healthcare management system


