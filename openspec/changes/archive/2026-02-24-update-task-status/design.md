## Context

Le système affiche une liste de tâches et permet d'en ajouter de nouvelles. Nous devons maintenant permettre la modification du statut "completed" des tâches existantes.

## Goals / Non-Goals

**Goals:**
- Permettre de basculer le statut d'une tâche (fait/à faire) via la case à cocher.
- Persister le changement en base de données.
- Assurer une mise à jour fluide de l'UI (sans rechargement de page).

**Non-Goals:**
- Éditer le titre de la tâche dans cette phase.
- Supprimer une tâche.

## Decisions

- **Server Action**: Utilisation d'une action serveur `toggleTaskStatus(id: string, completed: boolean)` pour mettre à jour la base de données.
- **useTransition**: Utilisation du hook `useTransition` dans le composant client `TaskItem` pour gérer le changement de statut de manière asynchrone tout en gardant l'UI réactive.
- **Revalidation**: Utilisation de `revalidatePath('/')` côté serveur après la mise à jour Prisma pour synchroniser tous les composants.
- **Stylage conditionnel**: Utilisation de classes Tailwind (`line-through`, `text-gray-400`) basées sur la prop `completed`.

## Risks / Trade-offs

- **Latence réseau**: [Risk] -> Un délai peut apparaître entre le clic et la mise à jour si la connexion est lente. [Mitigation] -> L'utilisation de `useTransition` permet d'afficher un état de chargement ou de garder l'interaction fluide. L'optimisme UI (Optimistic UI) pourrait être envisagé si la latence devient un problème majeur.
