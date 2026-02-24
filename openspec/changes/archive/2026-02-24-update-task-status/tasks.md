## 1. Action Serveur

- [x] 1.1 Créer l'action serveur `toggleTaskStatus` dans `src/lib/actions.ts`
- [x] 1.2 Implémenter la mise à jour Prisma et `revalidatePath('/')`

## 2. Composants UI

- [x] 2.1 Transformer `TaskItem` en composant client (`'use client'`)
- [x] 2.2 Ajouter le hook `useTransition` pour gérer le changement de statut
- [x] 2.3 Connecter l'input checkbox à l'action `toggleTaskStatus`
- [x] 2.4 Vérifier le stylage conditionnel (titre barré)

## 3. Vérification

- [x] 3.1 Tester le basculement du statut sur plusieurs tâches
- [x] 3.2 Vérifier la persistance après rechargement de la page
- [x] 3.3 S'assurer qu'aucun rechargement de page visible ne se produit
