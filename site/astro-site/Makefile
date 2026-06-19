# Makefile for the Astro site — common chores for rapid page editing.
#
# Quick start:
#   make dev      # start the live-reload dev server (your main loop)
#   make help     # list every target
#
# Most targets auto-install dependencies on first use.

# Use bash and fail fast on errors / unset vars / failed pipes.
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

# Default target: show help when you just type `make`.
.DEFAULT_GOAL := help

NPM ?= npm

.PHONY: help dev build preview check clean reinstall fresh deploy-build

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

## ---- dependencies -------------------------------------------------------
# Marker target: re-runs `npm ci` only when package-lock.json is newer.
node_modules: package-lock.json
	$(NPM) ci
	@touch node_modules

## ---- everyday loop ------------------------------------------------------
dev: node_modules ## Start the dev server with hot reload (http://localhost:4321)
	$(NPM) run dev

build: node_modules ## Production build of just the Astro site -> dist/
	$(NPM) run build

preview: build ## Build, then serve dist/ locally to check the production output
	$(NPM) run preview

check: node_modules ## Type-check + diagnostics across .astro/.ts/content
	npx astro check

## ---- housekeeping -------------------------------------------------------
clean: ## Remove build output and the Astro content cache (fixes stale content)
	rm -rf dist .astro

reinstall: ## Nuke node_modules and reinstall from the lockfile
	rm -rf node_modules
	$(NPM) ci

fresh: clean dev ## Clear caches, then start the dev server (when content looks stale)

## ---- full-site deploy build --------------------------------------------
deploy-build: ## Run the repo build.sh (Astro + standalone files + PCP explorer)
	cd ../.. && ./build.sh
