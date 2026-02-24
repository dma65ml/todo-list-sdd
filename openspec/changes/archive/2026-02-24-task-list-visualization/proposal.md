## Why

L'utilisateur a besoin de visualiser ses tâches pour suivre l'avancement de son travail et savoir ce qu'il lui reste à faire.

## What Changes

- Création d'une page principale affichant la liste des tâches.
- Récupération des tâches depuis la base de données SQLite via Prisma.
- Affichage du titre et du statut (coché/décoché) pour chaque tâche.
- Tri chronologique des tâches par date de création.
- Gestion de l'état "liste vide".

## Capabilities

### New Capabilities
- `task-list-view`: Définit les exigences pour l'affichage et le tri de la liste des tâches, incluant la représentation visuelle du statut et la gestion des cas aux limites (liste vide).

### Modified Capabilities
<!-- Aucun -->

## Impact

- Frontend (React/Next.js).
- Requêtes Prisma pour la récupération des données.
- Composants UI pour la liste et les éléments de tâche.
