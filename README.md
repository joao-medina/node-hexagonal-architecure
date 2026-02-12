# Hexagonal Architecture Study Project

This repository is a study project focused on the concepts of Hexagonal Architecture (Ports and Adapters).

## Folder Structure

- `src/domain`
- `src/application`
- `src/adapters`

## Layers Explained

### Domain
Core business concepts and rules: Entities.

### Application
Use cases and contracts (ports). Isolated from the implementation details.

### Adapters
Implementations of ports. Controller, Repository.
