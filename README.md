# healthcare-saas-free

Free serverless SaaS replicating Radar Healthcare's core modules (incident management, risk register, audit).

## Modules

- **incident_management** – handle incident recording and tracking
- **risk_register** – manage organizational risks and mitigation actions
- **audit_management** – track audit schedules and findings

## Audit Module

The `audit` folder contains a lightweight serverless module with endpoints for:

* `POST /audit/forms` - create an audit form with custom questions.
* `PUT /audit/forms/{id}` - edit an existing form.
* `POST /audit/schedule` - schedule an audit.
* `POST /audit/results` - submit audit results, including offline capture support.
* `POST /audit/sync` - sync offline results when back online.

All data is stored locally in JSON files under `audit/data` for simplicity. Unit tests can be run with `npm test`.

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

## Development

The project uses [Cloudflare Workers](https://workers.cloudflare.com/) for serverless functions. Source code lives in `src/` and tests reside in `tests/`.

Install dependencies and run tests:

```bash
npm install
npm test
```

## Continuous Integration

GitHub Actions handle CI/CD with two workflows:

- **CI** – installs dependencies and runs unit tests on every push and pull request.
- **Deploy** – publishes the worker to Cloudflare when changes are pushed to the `main` branch.

To enable deployments, configure the following repository secrets:

- `CLOUDFLARE_API_TOKEN` – API token with permission to publish workers.
- `CLOUDFLARE_ACCOUNT_ID` – your Cloudflare account ID.

Once the secrets are added, pushing to `main` will automatically run tests and deploy the worker.

## Frontend Design

The React frontend uses a simple theme built with [Chakra UI](https://chakra-ui.com/) and design tokens generated via **Magicpatterns**. Primary interface colors come from the Magicpatterns "Healthcare" palette:

- **Brand Blue:** `#2c7be5`
- **Accent Orange:** `#fca311`

Headings and body text use the **Inter** font family which is loaded from Google Fonts. All pages share consistent spacing and alignment through Chakra components.

### Customizing the Theme

Theme settings live in `frontend/src/theme.ts`. Edit the color or font values there and restart the development server to see changes.
