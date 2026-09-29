# Security policy

## Production model
StackUp Hold'em Academy is delivered as a Trusted Web Activity backed by the public GitHub Pages site for this repository. Changes to production-critical web files can therefore affect the experience opened by the Android app without publishing a new Android App Bundle.

## Critical assets
Treat these as production-critical:
- `.github/workflows/**`
- `android/**`
- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `academy-loader.js`
- `academy-visual-system.js`
- `privacy.html`

## Secrets
Never commit passwords, upload keystores, private keys, API tokens, service-account credentials, `.env` files, or Play signing material. Android signing credentials must remain in GitHub Actions Secrets or a protected GitHub Environment.

## Change control
Production changes should pass the repository CI checks before deployment. Branch/ruleset protection and CODEOWNERS review should be enabled for `main`, especially for workflows and Android signing/build files.

## Reporting
If a credential leak or unauthorized change is suspected, revoke/rotate the affected credential immediately, disable the relevant workflow if necessary, and review recent commits and Actions runs before restoring deployment.
