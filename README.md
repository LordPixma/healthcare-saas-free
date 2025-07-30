# healthcare-saas-free

Free serverless SaaS 

## Modules

- **incident_management** – handle incident recording and tracking
- **risk_register** – manage organizational risks and mitigation actions
- **audit_management** – track audit schedules and findings

## Audit Module

The `audit` folder contains a lightweight serverless module with endpoints for:

* `POST /audit/forms` - create an audit form with custom questions.
* `GET /audit/forms` - list audit forms.
* `GET /audit/forms/{id}` - retrieve a single form.
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
- `GET /risks` – list all risk records

### Local Development

The risk data is stored in `data/risk-db.json`. The handlers can be executed locally using Node:

```bash
node handlers/createRisk.js
```

Unit tests can be run with:

```bash
npm test
```

### Running the React UI

The client application lives in `frontend/`:

```bash
cd frontend
npm install
npm start
```
This starts a development server with pages for incidents, risks and audits.

### Authentication

The frontend integrates with **Auth0** for user login. Provide `AUTH0_DOMAIN` and
`AUTH0_CLIENT_ID` environment variables when running the UI. Routes are
protected based on roles contained in the JWT token. Two roles are supported:
`admin` and `staff`.

During unit tests or local scripts (`NODE_ENV=test`) authentication checks are
skipped.

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

### Cloudflare Pages

The React frontend is deployed using [Cloudflare Pages](https://pages.cloudflare.com/). The
`Deploy Frontend` workflow builds the app from `frontend/` and publishes the contents of
`frontend/dist` whenever changes land on `main`. Configure the same `CLOUDFLARE_API_TOKEN`
and `CLOUDFLARE_ACCOUNT_ID` secrets and create a Pages project named
`healthcare-saas-frontend` in your account.
