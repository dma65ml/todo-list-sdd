## 1. Initialisation et Configuration

- [x] 1.1 Installer Prisma et le client Prisma si nécessaire
- [x] 1.2 Initialiser le dossier Prisma (npx prisma init) si nécessaire

## 2. Définition du Schéma et Migrations

- [x] 2.1 Ajouter le modèle `Task` dans `schema.prisma` (id, title, completed, createdAt, updatedAt)
- [x] 2.2 Appliquer la migration pour créer la table dans SQLite (npx prisma migrate dev)

## 3. Validation et Tests

- [x] 3.1 Créer un test unitaire ou un script de vérification pour valider les contraintes (titre vide, titre > 200 caractères)
- [x] 3.2 Vérifier que les valeurs par défaut sont correctement appliquées (completed = false)
