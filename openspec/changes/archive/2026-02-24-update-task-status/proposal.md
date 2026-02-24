## Why

L'utilisateur doit pouvoir marquer une tâche comme terminée ou la remettre à faire pour suivre l'avancement de ses activités. Actuellement, le statut est statique après la création.

## What Changes

- Possibilité de cliquer sur la case à cocher d'une tâche pour basculer son statut.
- Mise en œuvre d'une action serveur (Server Action) pour mettre à jour le statut dans la base de données SQLite via Prisma.
- Mise à jour instantanée de l'interface utilisateur sans rechargement de page.
- Persistance du statut entre les sessions.

## Capabilities

### New Capabilities
- `task-status-update`: Gère le basculement du statut "completed" d'une tâche, sa persistance et le retour visuel immédiat.

### Modified Capabilities
<!-- Aucun -->

## Impact

- Frontend (Composant TaskItem).
- Actions serveur Next.js.
- Base de données SQLite (mise à jour via Prisma).
