# Contributing Guide

## Branching Strategy

- `main`: production-ready code only
- `develop`: integration branch for active development
- `feature/*`: new features
- `bugfix/*`: non-production bug fixes
- `hotfix/*`: urgent production fixes
- `release/*`: release preparation

## Pull Request Workflow

1. Create or confirm a linked issue.
2. Create a branch from the correct base branch using the naming convention above.
3. Open a PR using the repository PR template and include `Closes #<issue-number>`.
4. Ensure frontend checks pass (`npm run lint` and `npm run build` in `frontend`).
5. Request review from code owners before merge.

## Review Rules

- Every PR must receive at least one approving review.
- PRs can only be merged after required checks pass.
- Changes should remain scoped to the linked issue.

## Project Board Workflow

Use the GitHub Project board with this flow:

`Backlog` → `Ready` → `In Progress` → `In Review` → `Done`

- Move issues to **In Progress** when implementation starts.
- Move the linked item to **In Review** when opening a PR.
- Move the item to **Done** after the PR is merged.
