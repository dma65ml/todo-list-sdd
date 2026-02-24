## 1. Préparation des données

- [x] 1.1 Créer un singleton Prisma pour éviter les connexions multiples (src/lib/prisma.ts)
- [x] 1.2 Créer un script de seed pour injecter des tâches de test (prisma/seed.ts)

## 2. Composants UI

- [x] 2.1 Créer le composant `TaskItem` (affichage titre et case à cocher)
- [x] 2.2 Créer le composant `TaskList` (gestion de la liste et message "vide")

## 3. Page Principale

- [x] 3.1 Implémenter la récupération des tâches dans `app/page.tsx` avec tri chronologique
- [x] 3.2 Intégrer `TaskList` dans la page principale

## 4. Vérification

- [x] 4.1 Vérifier visuellement l'affichage et le tri
- [x] 4.2 Vérifier le message de liste vide en supprimant temporairement les tâches
