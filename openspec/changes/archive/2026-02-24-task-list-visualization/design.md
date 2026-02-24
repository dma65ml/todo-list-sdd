## Context

Le système dispose d'un modèle `Task` dans SQLite (via Prisma). Nous devons maintenant implémenter l'interface utilisateur pour afficher ces tâches.

## Goals / Non-Goals

**Goals:**
- Afficher la liste des tâches récupérées depuis la base de données.
- Assurer un tri chronologique ascendant.
- Fournir un retour visuel clair sur le statut (complété ou non).
- Gérer l'affichage gracieux d'une liste vide.

**Non-Goals:**
- Ajout, modification ou suppression de tâches dans cette phase.
- Pagination ou filtrage avancé.

## Decisions

- **Server Components (Next.js)**: Utilisation de React Server Components pour récupérer les données directement via Prisma côté serveur, évitant ainsi le besoin d'une API REST/JSON intermédiaire pour la lecture initiale.
- **Tailwind CSS**: Pour un stylage rapide et cohérent.
- **Tri Prisma**: Utilisation de `orderBy: { createdAt: 'asc' }` dans la requête Prisma.
- **Conditionnel "Liste Vide"**: Si le tableau retourné par Prisma est vide, afficher un message informatif.

## Risks / Trade-offs

- **Performance**: Pour une très grande liste de tâches, le rendu côté serveur complet pourrait devenir lent. [Mitigation] -> La taille de la liste est actuellement supposée raisonnable pour une todo-list personnelle.
