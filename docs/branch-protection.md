# Branch Protection Setup (GitHub)

This repository includes workflows and required-check names, but branch protection must be enabled in GitHub repository settings.

## Required settings for `main`

1. Require a pull request before merging.
2. Require status checks to pass before merging.
3. Require these status checks:
   - `quality`
   - `security`
   - `analyze`
   - `chromatic`
4. Require branches to be up to date before merging.
5. Restrict force pushes.
6. Restrict deletions.

## Why this is manual

Branch protection rules are repository settings. They cannot be fully enforced from source files alone.
