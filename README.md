# healthcare-saas-free

Free serverless SaaS replicating Radar Healthcare's core modules (incident management, risk register, audit).

## Development

The project uses [Cloudflare Workers](https://workers.cloudflare.com/) for serverless functions. Source code lives in `src/` and basic unit tests are located in `tests/`.

Install dependencies and run tests locally:

```bash
npm install
npm test
```

## Continuous Integration

GitHub Actions are used for CI/CD. Two workflows are defined in `.github/workflows`:

- **CI** – installs dependencies and runs unit tests on every push and pull request.
- **Deploy** – publishes the worker to Cloudflare when changes are pushed to the `main` branch.

To enable deployments, configure the following repository secrets:

- `CLOUDFLARE_API_TOKEN` – API token with permission to publish workers.
- `CLOUDFLARE_ACCOUNT_ID` – your Cloudflare account ID.

Once the secrets are added, pushing to `main` will automatically run tests and deploy the worker.

You can also trigger the workflows manually from the **Actions** tab on GitHub.
