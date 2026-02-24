# Capability: task-status-update

## Purpose
Définit les règles et comportements pour la modification du statut de complétion d'une tâche.

## Requirements

### Requirement: Modification du statut
Le système SHALL permettre à l'utilisateur de modifier le statut d'une tâche en cliquant sur sa case à cocher.

#### Scenario: Marquer une tâche comme faite
- **WHEN** l'utilisateur coche la case d'une tâche "à faire"
- **THEN** la case devient cochée, le titre est barré, et le statut est mis à jour à `true` en base de données.

#### Scenario: Remettre une tâche à faire
- **WHEN** l'utilisateur décoche la case d'une tâche "faite"
- **THEN** la case devient décochée, le titre n'est plus barré, et le statut est mis à jour à `false` en base de données.

### Requirement: Persistance du statut
Le changement de statut SHALL être persistant entre les rechargements de page.

#### Scenario: Vérification de la persistance après rechargement
- **WHEN** l'utilisateur modifie le statut d'une tâche et recharge la page
- **THEN** la tâche conserve son nouveau statut dans l'interface.

### Requirement: Mise à jour sans rechargement
L'interface SHALL refléter le changement de statut immédiatement sans nécessiter un rechargement complet de la page.

#### Scenario: Modification multiple
- **WHEN** l'utilisateur modifie plusieurs tâches séquentiellement
- **THEN** chaque modification est appliquée et persistée sans flash de rechargement de page.
