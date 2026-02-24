## 1. Action Serveur

- [x] 1.1 Créer l'action serveur `deleteTask` dans `src/lib/actions.ts`
- [x] 1.2 Implémenter la suppression Prisma par ID et `revalidatePath('/')`

## 2. Interface Utilisateur

- [x] 2.1 Ajouter un bouton de suppression dans le composant `TaskItem`
- [x] 2.2 Utiliser `useTransition` pour gérer la suppression de manière asynchrone
- [x] 2.3 Styliser le bouton avec Tailwind (couleur rouge, icône ou texte)

## 3. Vérification

- [x] 3.1 Tester la suppression d'une tâche et vérifier le retrait en base
- [x] 3.2 Vérifier l'affichage du message "Aucune tâche" après suppression de la dernière tâche
- [x] 3.3 Valider le build final
