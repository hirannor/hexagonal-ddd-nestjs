# Hexagonal DDD Practice Project (NestJS + TypeScript)

This repository is a **practice/example project** for applying:

- **Hexagonal Architecture (Ports & Adapters)**
- **DDD (Domain-Driven Design) principles**
- **NestJS + TypeScript** ecosystem

The goal is to keep the **domain and application logic independent** from technical details (web, database, framework-specific infrastructure), while wiring concrete adapters through dependency injection.

## Tech Stack

- **NestJS**
- **TypeScript**
- **TypeORM** (for persistence adapter)
- **PostgreSQL** (when TypeORM adapter is selected)
- **EventEmitter2** (domain/application event handling)

## Architecture Overview

- `src/domain`  
  Core domain model, domain events, and repository contracts (ports).

- `src/application`  
  Use cases and application services orchestrating domain behavior.

- `src/adapter`  
  External adapters:
    - web/rest controllers
    - persistence adapters (`typeorm`, `inmemory`)

- `src/infrastructure`  
  Shared technical abstractions and framework-facing contracts.

## Configuration

Environment is loaded from:

- `.env.development` (when `NODE_ENV=development`)

Repository adapter can be selected via env variable:

- `REPOSITORY_ADAPTER=typeorm`
- `REPOSITORY_ADAPTER=inmemory`

## Run

```bash
npm install
npm run start:dev
