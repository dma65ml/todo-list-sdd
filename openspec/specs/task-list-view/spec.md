# Capability: task-list-view

## Purpose
Définit les règles d'affichage et de tri de la liste des tâches pour l'utilisateur final.

## Requirements

### Requirement: Affichage de la liste des tâches
Le système SHALL afficher l'ensemble des tâches présentes dans la base de données.

#### Scenario: Affichage de la liste avec des tâches existantes
- **WHEN** l'utilisateur accède à la page principale
- **THEN** la liste affiche le titre et le statut de chaque tâche présente en base

### Requirement: Ordre chronologique
Les tâches SHALL être affichées dans l'ordre de leur création, de la plus ancienne à la plus récente.

#### Scenario: Ordre d'affichage chronologique
- **WHEN** l'utilisateur consulte la liste
- **THEN** les tâches apparaissent triées par date de création (ascendant)

### Requirement: Gestion de la liste vide
Le système SHALL informer l'utilisateur lorsqu'aucune tâche n'est disponible.

#### Scenario: Liste vide
- **WHEN** aucune tâche n'est enregistrée et l'utilisateur accède à la page principale
- **THEN** le message "Aucune tâche pour le moment" est affiché

### Requirement: Représentation visuelle du statut
Chaque tâche SHALL afficher son statut de complétion de manière distincte.

#### Scenario: Représentation visuelle du statut
- **WHEN** l'utilisateur voit la liste
- **THEN** les tâches "à faire" ont une case décochée et les tâches "faites" ont une case cochée et le titre barré
