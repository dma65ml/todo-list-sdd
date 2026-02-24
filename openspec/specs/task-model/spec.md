# Capability: task-model

## Purpose
Définit la structure de données et les règles de validation pour les tâches.

## Requirements

### Requirement: Stockage des tâches
Le système SHALL stocker les tâches dans une table nommée `Task` avec un identifiant unique, un titre, un statut de complétion et des horodatages.

#### Scenario: Création de la table Task
- **WHEN** le schéma Prisma est appliqué
- **THEN** une table `Task` existe avec les colonnes `id` (String, PK), `title` (String, NOT NULL), `completed` (Boolean, DEFAULT false), `createdAt` (DateTime) et `updatedAt` (DateTime)

### Requirement: Validation du titre
Le titre d'une tâche SHALL être obligatoire, non vide, et ne pas dépasser 200 caractères.

#### Scenario: Titre vide
- **WHEN** une tâche est créée avec un titre vide ou composé uniquement d'espaces
- **THEN** la création échoue avec une erreur de validation

#### Scenario: Titre trop long
- **WHEN** une tâche est créée avec un titre de plus de 200 caractères
- **THEN** la création échoue avec une erreur de validation

### Requirement: Statut par défaut
Une nouvelle tâche SHALL avoir le statut "à faire" (false) par défaut.

#### Scenario: Initialisation du statut
- **WHEN** une tâche est créée sans spécifier le statut
- **THEN** le champ `completed` est initialisé à `false`
