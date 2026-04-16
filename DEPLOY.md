# Cloudflare Pages Deployment

This project can be published the same way as `/Users/assaf/Documents/Apps/chef-reem`:

- build static files into `dist/`
- use a `wrangler.jsonc` file with `pages_build_output_dir`
- deploy with `wrangler pages deploy`
- optionally automate deployment from GitHub Actions on pushes to `main`

## Recommended Mode

Use **Cloudflare Pages Direct Upload with CI**, not Cloudflare's Git-integrated build flow.

That matches `chef-reem` and keeps deployment under this repo's control via Wrangler and GitHub Actions.

## Why This Fits This Repo

- This site is a static Vite build.
- `npm run build` already produces a deployable `dist/` folder.
- The custom Vite asset plugin already copies `/assets` into `dist/assets`, so Cloudflare Pages can serve the final build without extra runtime services.
- There is no server-side code or Pages Functions requirement right now.

## Files Added For Deployment

- `wrangler.jsonc`
- `.github/workflows/deploy.yml`
- `package.json` script: `cf:deploy`

## One-Time Cloudflare Setup

1. In Cloudflare, create a new **Pages** project named `vibe-code-presents`.
2. Choose the **Direct Upload** style of deployment.
3. If you want a custom domain, attach it after the first successful deployment.

## One-Time GitHub Setup

Add these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The API token needs permission to edit Cloudflare Pages at the account level.

## Local Manual Deploy

Run:

```bash
npm install
npm run cf:deploy
```

That will:

1. build the site
2. upload `dist/` to the `vibe-code-presents` Cloudflare Pages project

## CI Deploy

The GitHub Actions workflow deploys on push to `main`.

Because this project uses Vite and TypeScript, the workflow includes:

- `npm ci`
- `npm run build`
- `wrangler pages deploy dist --project-name=vibe-code-presents --branch=${{ github.ref_name }}`

This is the same overall pattern as `chef-reem`, with the extra dependency install step required for this repo.

## If You Want A Different Project Name

Change `vibe-code-presents` in:

- `wrangler.jsonc`
- `package.json`
- `.github/workflows/deploy.yml`

## Notes

- If you create the Pages project with Git integration instead of Direct Upload, Cloudflare does not let you switch that project to Direct Upload later.
- If this repo later adds `functions/`, Wrangler can deploy those too, but the current site does not need them.
