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
- **RabbitMQ** (messaging adapter for domain-event transport)
- **EventEmitter2** (internal domain/application event handling)

## Architecture Overview

- `src/domain`  
  Core domain model, domain events, value objects, and repository contracts (ports).

- `src/application`  
  Use cases and application services orchestrating domain behavior.

- `src/adapter`  
  External adapters:
    - web/rest controllers
    - persistence adapters (`typeorm`, `inmemory`)
    - messaging adapter (`rabbitmq`) for transport-level publish/consume

- `src/infrastructure`  
  Shared technical abstractions and framework-facing contracts.

## Domain Event Flow (Transport -> Internal Bus)

Current flow for domain events:

1. Application/domain creates a concrete domain event (e.g. product created).
2. Publisher sends it through RabbitMQ under pattern/type `domain_event`.
3. RabbitMQ consumer receives payload in transport shape (plain JSON).
4. Consumer maps payload to the correct concrete `DomainEvent` using category-based mapper
