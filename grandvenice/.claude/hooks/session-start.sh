#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$(dirname "$0")")")}"

# Install npm dependencies
npm install

# Generate Prisma client (required for @prisma/client imports to resolve)
npx prisma generate
