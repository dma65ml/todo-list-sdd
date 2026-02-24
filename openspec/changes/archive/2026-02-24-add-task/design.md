## Context

Le système affiche actuellement une liste de tâches récupérée via Prisma. Nous devons ajouter la possibilité de créer de nouvelles tâches directement depuis l'interface utilisateur.

## Goals / Non-Goals

**Goals:**
- Fournir un formulaire d'ajout simple.
- Assurer la persistence des données dans SQLite.
- Gérer les validations (titre requis, non vide, max 200).
- Mettre à jour la liste sans rechargement complet de la page.

**Non-Goals:**
- Édition ou suppression de tâches.
- Priorisation ou catégories de tâches.

## Decisions

- **Server Actions (Next.js)**: Utilisation de `use server` pour gérer la création de tâches. C'est le pattern standard et idiomatique pour Next.js App Router.
- **Formulaire Client**: Utilisation de `useFormStatus` ou d'un simple état React pour gérer le vidage du champ après succès.
- **Revalidation**: Utilisation de `revalidatePath('/')` après l'ajout pour forcer Next.js à rafraîchir les données de la page sans rechargement complet (SPA-like update).
- **Gestion d'Erreur**: Affichage d'un message d'erreur sous le champ en cas d'échec de validation (client ou serveur).

## Risks / Trade-offs

- **UX**: Sans optimisme UI (optimistic updates), il y a un léger délai entre le clic et l'apparition de la tâche. [Mitigation] -> Pour ce MVP, une revalidation simple suffit, l'optimisme pourra être ajouté plus tard si nécessaire.
