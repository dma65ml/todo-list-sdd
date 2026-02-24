## Why

L'utilisateur doit pouvoir supprimer les tâches dont il n'a plus besoin afin de maintenir une liste propre et pertinente.

## What Changes

- Ajout d'un bouton de suppression sur chaque élément de tâche (`TaskItem`).
- Mise en œuvre d'une action serveur (Server Action) pour supprimer la tâche de la base de données SQLite via Prisma.
- Mise à jour immédiate de l'interface utilisateur après suppression.
- Affichage automatique du message "Aucune tâche pour le moment" si la liste devient vide.

## Capabilities

### New Capabilities
- `task-deletion`: Gère le retrait définitif d'une tâche de la liste et de la base de données.

### Modified Capabilities
<!-- Aucun -->

## Impact

- Frontend (Composant TaskItem, composant TaskList).
- Actions serveur Next.js.
- Base de données SQLite (Prisma).
