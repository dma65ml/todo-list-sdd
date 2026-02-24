## Context

Le système actuel permet la création et la mise à jour du statut des tâches. Nous devons maintenant ajouter une fonctionnalité pour supprimer définitivement une tâche.

## Goals / Non-Goals

**Goals:**
- Ajouter un bouton de suppression intuitif sur chaque tâche.
- Retirer la tâche de la base de données SQLite via Prisma.
- Assurer une mise à jour immédiate de l'interface utilisateur.
- Gérer l'état "liste vide" après suppression.

**Non-Goals:**
- Archivage (soft delete) des tâches.
- Corbeille de récupération.

## Decisions

- **Server Action**: Utilisation d'une action serveur `deleteTask(id: string)` pour la suppression en base.
- **useTransition**: Utilisation du hook `useTransition` dans `TaskItem` pour une suppression fluide sans rechargement de page.
- **Revalidation**: `revalidatePath('/')` après la suppression pour mettre à jour la liste et le message "vide".
- **Icône de suppression**: Utilisation d'une icône simple ou d'un bouton texte "Supprimer" stylisé avec Tailwind (`text-red-500`).

## Risks / Trade-offs

- **Action destructive**: [Risk] -> Une suppression accidentelle peut survenir. [Mitigation] -> Pour ce MVP, l'action est directe. Une boîte de dialogue de confirmation pourrait être ajoutée dans une itération future.
