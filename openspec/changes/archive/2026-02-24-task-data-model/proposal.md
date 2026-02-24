## Why

Le système a besoin d'une méthode pour stocker les tâches de manière persistante afin qu'elles ne soient pas perdues entre les sessions de l'utilisateur.

## What Changes

- Introduction d'une table `Task` dans la base de données SQLite.
- Utilisation de Prisma pour la gestion du schéma et de la persistence.
- Mise en œuvre de validations strictes pour les titres des tâches (longueur max, non vide).

## Capabilities

### New Capabilities
- `task-model`: Définit la structure de données pour les tâches, incluant l'identifiant unique, le titre, le statut de complétion et les horodatages.

### Modified Capabilities
<!-- Aucun -->

## Impact

- Schéma de base de données (schema.prisma).
- Logique de validation des données pour les tâches.
- Persistance SQLite.
