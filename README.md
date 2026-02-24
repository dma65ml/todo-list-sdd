# Démonstration de Spec-Driven Development (SDD) avec une Todo-list

Ce projet est un support pédagogique pour des développeurs souhaitant découvrir ou approfondir la méthode **Spec-Driven Development (SDD)**. Il illustre la construction progressive d'une application de Todo-list en suivant un processus rigoureux : du RDP (Résumé des Exigences du Produit) au SRS (Spécification des Exigences Logicielles), puis à l'implémentation par petits artifacts validés.

L'ensemble de la stack technique et des outils a été choisi pour sa modernité, sa simplicité et son efficacité, en parfaite adéquation avec les principes de Clean Code.

## Objectif Pédagogique

*   Comprendre et appliquer la méthode SDD.
*   Rédiger des spécifications claires (RDP, SRS, artifacts Gherkin).
*   Utiliser des outils d'IA (OpenCode, OpenSpec) pour accélérer le développement sans sacrifier la qualité.
*   Produire un code maintenable, testable et conforme aux exigences.

## Environnement et Prérequis

*   **Node.js** (version 18 ou supérieure recommandée)
*   **pnpm** (gestionnaire de paquets rapide et efficace)
*   **OpenCode** ([Agent de codage IA](https://opencode.ai/docs/fr/))
*   **OpenSpec** ([Gestionnaire de spécifications](https://github.com/Fission-AI/OpenSpec))

## Initialisation du Projet (Étape par Étape)

Suivez ces instructions pour configurer votre environnement de développement exactement comme dans la démonstration.

### 1. Création de l'application Next.js

```bash
# Crée une application Next.js avec TypeScript, Tailwind, ESLint et le dossier src/
pnpm create next-app@latest todo-list-sdd --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-react-compiler
cd todo-list-sdd
```

### 2. Installation des Outils d'Assistance
bash
# Installe Repomix pour optimiser les échanges de tokens avec l'IA (inclusion de code dans les prompts)
```bash
pnpm add -D repomix
```

# Configure Repomix (créez un fichier `repomix.config.json` à la racine)
Contenu de repomix.config.json :

```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml"
  },
  "ignore": {
    "customPatterns": [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "pnpm-lock.yaml"
    ]
  }
}
```

### 3. Définition des Règles de Codage
Créez un fichier REGLES.md à la racine du projet. Ce fichier servira de guide de style pour l'IA et pour l'équipe.

Contenu de REGLES.md :

```markdown
Répondez toujours en français.
Respecte les règles du Clean Code (DRY, KISS, YAGNI, SOLID).
Propose un code simple, efficace et concis.
Le code doit être bien structuré, lisible et maintenable.
Commente les fonctions créées pour expliquer leur rôle (pas ce qu'elles font, mais pourquoi).
```

### 4. Initialisation des Spécifications (RDP & SRS)
Placez vos documents de haut niveau à la racine du projet. Ce sont les pierres angulaires de la méthode SDD.

- RDP.md (Résumé des Exigences du Produit)
- SRS.md (Spécification des Exigences Logicielles)

### 5. Initialisation d'open code & d'OpenSpec
1. Lancez OpenCode (à la racine du projet) :

```bash
opencode
```

Ceci ouvre l'interface en ligne de commande d'OpenCode.

2. Initialisez OpenCode avec vos règles et spécifications :
Dans l'interface OpenCode, exécutez la commande :

```text
/Init @REGLES.md @RDP.md @SRS.md
```

OpenCode va intégrer ces documents pour guider ses futures actions.
Quittez ensuite l'interface avec la commande :

```text
/Exit
```

3. Initialisez OpenSpec :
```bash
# Initialise la structure OpenSpec dans le projet
openspec init
```

- Lors de l'initialisation, sélectionnez l'environnement opencode comme moteur (validez avec la touche Tab). Cela créera un dossier openspec/ avec la structure suivante :
 - openspec/specs/ : Dossier qui contiendra la source de vérité de vos spécifications (les exigences validées).
 - openspec/changes/ : Dossier qui contiendra les propositions de modifications en cours (proposal, design, tasks, et les delta specs).

### 6. Premier Lancement et Connexion des Outils
1. Lancez l'application Next.js dans un premier terminal :

```bash
pnpm dev
```

Vérifiez que l'application est accessible sur http://localhost:3000 (elle affiche la page par défaut de Next.js).


2. Générez un contexte pour l'IA avec Repomix (optionnel, mais utile pour partager le contexte) :

Ouvrez un second terminal (à la racine du projet)

```bash
npx repomix
```
Cette commande crée un fichier repomix-output.xml contenant la structure et le contenu de votre code, prêt à être copié dans un prompt d'IA.

3. Lancez OpenCode :

```bash
opencode
```

### 7. Workflow de Développement
# Le Workflow de Développement par les Spécifications (OpenSpec)
Le cœur de la méthode repose sur un cycle itératif simple mais puissant, orchestré par OpenSpec. Voici comment il fonctionne, en reprenant l'exemple de votre premier changement.

# Le Cycle : Proposer, Spécifier, Concevoir, Implémenter, Archiver

Proposer ──► Spécifier ──► Concevoir ──► Implémenter ──► Archiver
   ▲            ▲              ▲                            │
   └────────────┴──────────────┴────────────────────────────┘
   Mettez à jour au fur et à mesure suivant vos spécification

1. Démarrer une nouvelle fonctionnalité (changement) :
Dans l'interface OpenCode, exécutez :

```text
/opsx:new Fonctionnalité: Modèle de données des tâches
  En tant que système
  Je dois pouvoir stocker des tâches
  Afin de les rendre persistantes entre les sessions

  Règles de gestion:
    - Une tâche est identifiée de manière unique par un identifiant auto-généré.
    - Une tâche a un titre obligatoire, d'une longueur maximale de 200 caractères.
    - Une tâche a un statut booléen (true = fait, false = à faire).
    - Par défaut, une nouvelle tâche a le statut "à faire" (false).
    - La date de création et de mise à jour doivent être enregistrées pour traçabilité (optionnel mais recommandé).

  Scénario: Création de la table Task
    Etant donné que la base de données est SQLite
    Quand on applique le schéma Prisma
    Alors une table "Task" doit exister avec les colonnes suivantes:
      | Champ        | Type     | Contraintes                  |
      | id           | String   | PRIMARY KEY, DEFAULT uuid()  |
      | title        | String   | NOT NULL, MAX 200            |
      | completed    | Boolean  | NOT NULL, DEFAULT false      |
      | createdAt    | DateTime | NOT NULL, DEFAULT now()      |
      | updatedAt    | DateTime | NOT NULL, DEFAULT now()      |

  Scénario: Validation du titre
    Etant donné une tentative de création d'une tâche
    Quand le titre est vide ou ne contient que des espaces
    Alors la création doit échouer avec une erreur de validation
    Et aucun enregistrement n'est ajouté en base

  Scénario: Validation de la longueur du titre
    Etant donné une tentative de création d'une tâche
    Quand le titre dépasse 200 caractères
    Alors la création doit échouer avec une erreur de validation
```

Cela crée un nouveau dossier openspec/changes/ pour votre proposition.

Créer les artifacts de planification :
Pour générer tous les documents de conception en une fois, utilisez la commande fast-forward :

```text
/opsx:ff
```

(La commande /opsx:continue que vous pouvez utilisée est une alternative qui permet de les créer une par une les étapes de spécifications).
OpenSpec va générer, dans le dossier du changement openspec/changes/:

view-task-list/proposal.md : Décrit le "pourquoi" et le "quoi".

specs/ : Contient les delta specs (exigences ajoutées, modifiées ou supprimées, au format Gherkin).

design.md : Détaille l'approche technique.

tasks.md : Fournit une checklist d'implémentation.

Implémenter les tâches :
Une fois le plan validé, lancez l'implémentation automatique :

```text
/opsx:apply
```
OpenCode va travailler sur la base de code pour accomplir les tâches listées dans tasks.md. Vous pouvez suivre sa progression.

Valider et archiver le changement :
Après avoir vérifié que tout fonctionne, archivez le changement :

```text
/opsx:archive
```

Cette étape est cruciale : elle fusionne les delta specs (vos nouvelles exigences) dans le dossier principal openspec/specs/, qui devient ainsi la nouvelle source de vérité. Le dossier du changement est déplacé dans openspec/changes/archive/ pour l'historique.

Félicitations ! Vous venez de finaliser votre premier cycle de développement 100% piloté par les spécifications. Le dossier openspec/specs/ contient désormais la trace de ce premier changement.

Le cycle est alors prêt à recommencer pour la fonctionnalité suivante (visualisation des tâches, ajout, etc.).

2. Démarrer la fonctionnalité suivante :

```text
/opsx:new Fonctionnalité: Visualisation de la liste des tâches
  En tant qu'utilisateur
  Je veux voir toutes mes tâches
  Afin de connaître ce que j'ai à faire et ce qui est déjà fait

  Règles d'affichage:
    - Les tâches sont affichées dans l'ordre de création (de la plus ancienne à la plus récente).
    - Chaque tâche montre son titre et son statut.
    - Le statut "fait" est représenté par une case cochée, "à faire" par une case décochée.
    - Optionnellement, les tâches "faites" peuvent avoir le titre barré.
    - La liste doit être vide s'il n'y a aucune tâche.

  Scénario: Affichage de la liste avec des tâches existantes
    Etant donné que les tâches suivantes existent en base de données:
      | titre                  | completed |
      | Acheter du lait        | false     |
      | Envoyer rapport        | true      |
      | Réviser le cours SDD   | false     |
    Quand l'utilisateur accède à la page principale de l'application
    Alors la liste affichée contient exactement 3 tâches
    Et la première tâche affichée est "Acheter du lait" avec le statut "à faire"
    Et la deuxième tâche affichée est "Envoyer rapport" avec le statut "fait"
    Et la troisième tâche affichée est "Réviser le cours SDD" avec le statut "à faire"

  Scénario: Ordre d'affichage chronologique
    Etant donné que les tâches ont été créées dans cet ordre:
      | titre            | created_at (ordre) |
      | Première tâche   | 1 (plus ancienne)  |
      | Deuxième tâche   | 2                  |
      | Troisième tâche  | 3 (plus récente)   |
    Quand l'utilisateur consulte la liste
    Alors les tâches apparaissent dans l'ordre: "Première tâche", "Deuxième tâche", "Troisième tâche"

  Scénario: Liste vide
    Etant donné qu'aucune tâche n'est enregistrée
    Quand l'utilisateur accède à la page principale
    Alors un message "Aucune tâche pour le moment" est affiché
    Et la liste est vide

  # Scénario supplémentaire pour valider l'affichage du statut
  Scénario: Représentation visuelle du statut
    Etant donné une tâche "Faire du sport" avec le statut "à faire"
    Et une tâche "Lire un livre" avec le statut "fait"
    Quand l'utilisateur voit la liste
    Alors la case à cocher de "Faire du sport" n'est pas cochée
    Et la case à cocher de "Lire un livre" est cochée
    Et le titre de "Lire un livre" est barré (optionnel)
```

Créer les artifacts de planification :

```text
/opsx:ff
```

Lancez l'implémentation automatique :

```text
/opsx:apply
```

Valider et archiver le changement :

```text
/opsx:archive
```

3. Fonctionnalité 3 :

```text
/opsx:new Fonctionnalité: Ajout d'une nouvelle tâche
  En tant qu'utilisateur
  Je veux ajouter une tâche à ma liste
  Afin de m'en souvenir et de pouvoir la marquer comme faite plus tard

  Règles de validation:
    - Le titre est obligatoire.
    - Le titre ne peut pas être vide ni composé uniquement d'espaces.
    - La longueur maximale du titre est de 200 caractères.
    - Une fois ajoutée, la tâche apparaît immédiatement dans la liste (sans rechargement de page) avec le statut "à faire".
    - Le champ de saisie est vidé après un ajout réussi.
    - En cas d'erreur de validation, un message d'erreur clair est affiché.

  Scénario: Ajout réussi d'une tâche avec titre valide
    Etant donné que l'utilisateur est sur la page principale
    Quand il saisit "Préparer la présentation SDD" dans le champ de nouvelle tâche
    Et qu'il clique sur le bouton "Ajouter" (ou appuie sur Entrée)
    Alors une nouvelle tâche "Préparer la présentation SDD" avec le statut "à faire" apparaît dans la liste
    Et le champ de saisie est vide
    Et le nombre total de tâches augmente de 1
    Et la tâche est persistée en base de données

  Scénario: Ajout avec titre vide
    Etant donné que l'utilisateur est sur la page principale
    Quand il laisse le champ vide et clique sur "Ajouter"
    Alors un message d'erreur "Le titre ne peut pas être vide" s'affiche
    Et aucune tâche n'est ajoutée
    Et le champ de saisie reste vide (ou conserve la valeur saisie)

  Scénario: Ajout avec titre composé uniquement d'espaces
    Etant donné que l'utilisateur est sur la page principale
    Quand il saisit "   " (trois espaces) dans le champ
    Et qu'il clique sur "Ajouter"
    Alors un message d'erreur "Le titre ne peut pas être vide" s'affiche
    Et aucune tâche n'est ajoutée

  Scénario: Ajout avec titre trop long (201 caractères)
    Etant donné que l'utilisateur est sur la page principale
    Quand il saisit un titre de 201 caractères (par exemple "a" répété 201 fois)
    Et qu'il clique sur "Ajouter"
    Alors un message d'erreur "Le titre ne doit pas dépasser 200 caractères" s'affiche
    Et aucune tâche n'est ajoutée

  Scénario: Ajout avec titre de 200 caractères (limite)
    Etant donné que l'utilisateur est sur la page principale
    Quand il saisit un titre de exactement 200 caractères valides
    Et qu'il clique sur "Ajouter"
    Alors la tâche est créée avec succès
    Et elle apparaît dans la liste

  # Scénario technique (pour vérifier la mise à jour instantanée)
  Scénario: Mise à jour de la liste sans rechargement
    Etant donné que l'utilisateur est sur la page principale avec la liste actuelle des tâches
    Quand il ajoute une nouvelle tâche "Tâche fraîche"
    Alors la liste affichée est mise à jour immédiatement pour inclure "Tâche fraîche"
    Et il n'y a pas de rechargement visible de la page (pas de flash blanc)
```

Créer les artifacts de planification :

```text
/opsx:ff
```

Lancez l'implémentation automatique :

```text
/opsx:apply
```

Valider et archiver le changement :

```text
/opsx:archive
```

4. Fonctionnalité 4 :

```text
/opsx:new Fonctionnalité: Modification du statut d'une tâche
  En tant qu'utilisateur
  Je veux pouvoir marquer une tâche comme faite ou à faire
  Afin de suivre ma progression

  Règles de gestion:
    - Le statut est modifié en cliquant sur la case à cocher associée à la tâche.
    - Le changement est immédiat (pas de rechargement de page).
    - Le nouveau statut est persistant (enregistré en base de données).
    - L'interface reflète visuellement le nouveau statut (case cochée/décochée, texte barré optionnel).
    - Une tâche "faite" peut être remise "à faire" en décochant la case.

  Scénario: Marquer une tâche comme faite
    Etant donné une tâche existante avec le titre "Acheter du lait" et le statut "à faire"
    Quand l'utilisateur clique sur la case à cocher de cette tâche
    Alors la case devient cochée
    Et le statut de la tâche en base de données devient "fait" (completed = true)
    Et optionnellement, le titre est barré
    Et la liste reste affichée sans rechargement

  Scénario: Remettre une tâche à faire
    Etant donné une tâche existante avec le titre "Envoyer rapport" et le statut "fait"
    Quand l'utilisateur décoche la case de cette tâche
    Alors la case devient décochée
    Et le statut de la tâche en base de données redevient "à faire" (completed = false)
    Et le texte n'est plus barré
    Et la liste reste affichée sans rechargement

  Scénario: Modification multiple
    Etant donné les tâches suivantes:
      | titre        | completed |
      | Tâche 1      | false     |
      | Tâche 2      | true      |
      | Tâche 3      | false     |
    Quand l'utilisateur coche la case de "Tâche 1"
    Et décoche la case de "Tâche 2"
    Alors "Tâche 1" devient "fait"
    Et "Tâche 2" devient "à faire"
    Et "Tâche 3" reste inchangée
    Et les modifications sont persistées en base

  Scénario: Vérification de la persistance après rechargement
    Etant donné une tâche avec le statut "à faire"
    Quand l'utilisateur coche la case (devient "fait")
    Et qu'il recharge la page
    Alors la tâche apparaît toujours avec le statut "fait"
```

Créer les artifacts de planification :

```text
/opsx:ff
```

Lancez l'implémentation automatique :

```text
/opsx:apply
```

Valider et archiver le changement :

```text
/opsx:archive
```

5. Fonctionnalité final :

```text
/opsx:new Fonctionnalité: Suppression d'une tâche
  En tant qu'utilisateur
  Je veux pouvoir supprimer une tâche de ma liste
  Afin de retirer les tâches dont je n'ai plus besoin

  Règles de gestion:
    - Chaque tâche dispose d'un bouton de suppression (icône poubelle ou texte "Supprimer").
    - Un clic sur ce bouton supprime immédiatement la tâche de la liste (sans rechargement de page).
    - La suppression est définitive : la tâche est retirée de la base de données.
    - Aucune confirmation n'est demandée (action directe, mais on peut discuter d'une éventuelle confirmation pour un projet plus robuste).
    - Si la liste devient vide, le message "Aucune tâche pour le moment" apparaît.

  Scénario: Suppression d'une tâche existante
    Etant donné une tâche existante avec le titre "Faire les courses"
    Quand l'utilisateur clique sur le bouton de suppression de cette tâche
    Alors la tâche "Faire les courses" disparaît de la liste
    Et le nombre total de tâches diminue de 1
    Et la tâche n'est plus présente en base de données
    Et la mise à jour est immédiate (pas de rechargement visible)

  Scénario: Suppression de la dernière tâche
    Etant donné qu'il n'y a qu'une seule tâche dans la liste avec le titre "Dernière tâche"
    Quand l'utilisateur supprime cette tâche
    Alors la liste devient vide
    Et le message "Aucune tâche pour le moment" s'affiche

  Scénario: Suppressions multiples
    Etant donné les tâches suivantes:
      | titre     |
      | Tâche A   |
      | Tâche B   |
      | Tâche C   |
    Quand l'utilisateur supprime "Tâche B"
    Puis supprime "Tâche A"
    Alors seule "Tâche C" reste dans la liste
    Et les tâches supprimées ne sont plus en base

  Scénario: Persistance après suppression et rechargement
    Etant donné une tâche "Temporaire"
    Quand l'utilisateur la supprime
    Et recharge la page
    Alors la tâche n'apparaît pas (elle est bien définitivement supprimée)
```

Créer les artifacts de planification :

```text
/opsx:ff
```

Lancez l'implémentation automatique :

```text
/opsx:apply
```

Valider et archiver le changement :

```text
/opsx:archive
```

***Félicitations, vous avez terminé votre inscription sans avoir à écrire une seule ligne de code.***


### 8. Ressources et Documentation
Documentation OpenCode : https://opencode.ai/docs/fr/

Documentation OpenSpec : https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md

Les documents sources de ce projet : RDP.md (conceptuel) et SRS.md (détaillé) sont disponibles à la racine.

Ce README doit maintenant vous permettre de recréer l'environnement et de comprendre le workflow.