## Why

L'utilisateur doit pouvoir ajouter de nouvelles tâches à sa liste de manière simple et intuitive pour organiser son travail. Actuellement, la liste est statique (initialisée par seed).

## What Changes

- Ajout d'un formulaire de saisie (champ texte et bouton) sur la page principale.
- Mise en œuvre d'une action serveur (Server Action) pour la création de tâches dans la base de données.
- Validation des données côté client et côté serveur (titre obligatoire, non vide, max 200 caractères).
- Mise à jour instantanée de l'interface utilisateur après l'ajout.

## Capabilities

### New Capabilities
- `task-creation`: Gère la saisie, la validation et la persistance des nouvelles tâches.

### Modified Capabilities
<!-- Aucun -->

## Impact

- Frontend (composant de formulaire).
- Actions serveur Next.js.
- Validation Prisma/Applicative.
