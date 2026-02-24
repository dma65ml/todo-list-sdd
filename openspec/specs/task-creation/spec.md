# Capability: task-creation

## Purpose
Définit les mécanismes et règles pour la création de nouvelles tâches dans le système.

## Requirements

### Requirement: Formulaire d'ajout
Le système SHALL proposer un champ de saisie textuelle et un bouton "Ajouter" pour créer une nouvelle tâche.

#### Scenario: Ajout réussi d'une tâche avec titre valide
- **WHEN** l'utilisateur saisit un titre valide et clique sur "Ajouter"
- **THEN** une nouvelle tâche est créée en base, apparaît dans la liste, et le champ est vidé

### Requirement: Validation du titre à l'ajout
Le titre d'une tâche SHALL être obligatoire, non vide (après trim), et ne pas dépasser 200 caractères.

#### Scenario: Titre vide ou espaces
- **WHEN** l'utilisateur tente d'ajouter une tâche avec un titre vide ou composé uniquement d'espaces
- **THEN** un message d'erreur "Le titre ne peut pas être vide" est affiché et aucune tâche n'est créée

#### Scenario: Titre trop long
- **WHEN** l'utilisateur saisit un titre de plus de 200 caractères
- **THEN** un message d'erreur "Le titre ne doit pas dépasser 200 caractères" est affiché

### Requirement: Mise à jour instantanée
L'interface SHALL se mettre à jour pour inclure la nouvelle tâche sans rechargement complet de la page.

#### Scenario: Mise à jour de la liste sans rechargement
- **WHEN** une tâche est ajoutée avec succès
- **THEN** la liste est rafraîchie immédiatement pour inclure le nouvel élément
