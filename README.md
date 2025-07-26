# healthcare-saas-free

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

