## Context

Le projet nécessite une solution de stockage persistante pour les tâches. Actuellement, les données sont volatiles. L'objectif est d'utiliser SQLite avec Prisma comme ORM pour gérer les données.

## Goals / Non-Goals

**Goals:**
- Définir le schéma Prisma pour l'entité `Task`.
- Garantir l'intégrité des données via des contraintes de base de données et des validations applicatives.
- Automatiser la gestion des horodatages (création/mise à jour).

**Non-Goals:**
- Mise en œuvre d'une interface utilisateur (UI) dans cette phase.
- Gestion multi-utilisateur ou authentification.

## Decisions

- **Utilisation de Prisma**: Choisi pour son typage fort et sa facilité de gestion des migrations.
- **SQLite**: Choisi pour sa simplicité de configuration et son adéquation avec une application de type "todo-list" locale.
- **Identifiants UUID**: Préférés aux entiers auto-incrémentés pour éviter les collisions et faciliter d'éventuelles synchronisations futures.
- **Validations au niveau DB et Applicatif**: Le titre est contraint à 200 caractères au niveau du modèle.

## Risks / Trade-offs

- **Evolution du schéma**: [Risk] -> Les changements de schéma nécessitent des migrations Prisma. [Mitigation] -> Utilisation rigoureuse de `prisma migrate`.
