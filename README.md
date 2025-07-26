# healthcare-saas-free
Free serverless SaaS replicating Radar Healthcare's core modules (incident management, risk register, audit).

## Audit Module

The `audit` folder contains a lightweight serverless module with endpoints for:

* `POST /audit/forms` - create an audit form with custom questions.
* `PUT /audit/forms/{id}` - edit an existing form.
* `POST /audit/schedule` - schedule an audit.
* `POST /audit/results` - submit audit results, including offline capture support.
* `POST /audit/sync` - sync offline results when back online.

All data is stored locally in JSON files under `audit/data` for simplicity. Unit tests can be run with `npm test`.
