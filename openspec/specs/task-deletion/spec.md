# Capability: task-deletion

## Purpose
Définit les mécanismes et règles pour la suppression définitive de tâches de la liste.

## Requirements

### Requirement: Bouton de suppression
Chaque tâche SHALL disposer d'un bouton de suppression accessible.

#### Scenario: Suppression d'une tâche existante
- **WHEN** l'utilisateur clique sur le bouton de suppression d'une tâche
- **THEN** la tâche est définitivement retirée de la base de données et disparaît de la liste immédiatement.

### Requirement: Mise à jour après suppression
Le système SHALL rafraîchir l'interface utilisateur sans rechargement complet de la page après une suppression.

#### Scenario: Suppressions multiples
- **WHEN** l'utilisateur supprime plusieurs tâches à la suite
- **THEN** chaque tâche disparaît instantanément et le nombre de tâches affichées diminue.

### Requirement: Gestion du cas "liste vide"
Le système SHALL afficher un message informatif si la dernière tâche est supprimée.

#### Scenario: Suppression de la dernière tâche
- **WHEN** l'utilisateur numériquement supprime l'unique tâche restante
- **THEN** le message "Aucune tâche pour le moment" apparaît dans la liste.

### Requirement: Persistance de la suppression
La suppression SHALL être définitive entre les sessions.

#### Scenario: Persistance après suppression et rechargement
- **WHEN** une tâche est supprimée et que la page est rechargée
- **THEN** la tâche supprimée ne réapparaît pas.
