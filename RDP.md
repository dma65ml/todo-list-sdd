# RDP – Résumé des Exigences du Produit
RDP – Résumé des Exigences du Produit
Application : Todo-List (projet pédagogique SDD)
Version : 1.0
Date : 2026-02-23

--------

## 1. Objectifs du produit
L’application a pour but de fournir un outil simple de gestion de tâches quotidiennes. Elle servira de support pédagogique pour illustrer la méthode Spec-Driven Development (SDD) auprès de développeurs seniors.
L’accent est mis sur la clarté des spécifications et la traçabilité entre les exigences et l’implémentation.

## 2. Utilisateurs cibles
- Utilisateur unique (mode mono-utilisateur).
- Pas de gestion de comptes ni de synchronisation multi-appareils.

## 3. Fonctionnalités principales (MVP)

| ID | Fonctionnalité | Description courte |
|-----------|----------|----------|
| F01 | Visualiser les tâches | Afficher la liste des tâches avec leur titre et leur statut (à faire / fait). |
| F02 | Ajouter une tâche | Permettre de créer une nouvelle tâche en saisissant un titre. |
| F03 | Modifier le statut | Marquer une tâche comme « faite » ou « à faire » (via une case à cocher ou un bouton). |
| F04 | Supprimer une tâche | Retirer définitivement une tâche de la liste. |
 | F05 | Persistance des données | Les tâches sont conservées entre deux sessions de navigation (base de données locale). |

## 4. Contraintes générales
- Application web (responsive, utilisable sur mobile et desktop).
- Mono-utilisateur : aucune gestion d’authentification.
- Les données sont stockées localement sur le poste de l’utilisateur.
- La stack technique imposée pour la démonstration : Next.js, pnpm, Tailwind CSS, Prisma ORM, SQLite.
- L’interface doit être épurée et intuitive, sans fonctionnalité superflue (principe YAGNI).

## 5. Critères de succès
- Toutes les fonctionnalités listées sont implémentées et testables.
- Le code produit respecte les principes Clean Code (DRY, KISS, SOLID).
- Le projet illustre efficacement la méthode SDD (du RDP au SRS, puis au code).


