# SRS – Spécification des Exigences Logicielles
Application : Todo-List
Version : 1.0
Date : 2026-02-23

## 1. Introduction
### 1.1 Objet du document
Ce document détaille les exigences fonctionnelles et les règles de gestion de l’application Todo-List. Il sert de contrat entre les parties prenantes et guide l’équipe de développement dans la réalisation du produit.

### 1.2 Portée
Le logiciel permettra à un utilisateur unique de gérer une liste de tâches personnelles. Les fonctionnalités se limitent à la création, la consultation, la mise à jour du statut et la suppression de tâches. Aucune fonctionnalité collaborative ou avancée (pièces jointes, rappels) n’est prévue.

### 1.3 Définitions et acronymes
- Tâche : élément de la liste, composé d’un titre (chaîne de caractères) et d’un statut booléen (fait/à faire).
- Statut : indique si la tâche est accomplie (true) ou non (false).
- Mono-utilisateur : l’application ne gère qu’un seul utilisateur implicite.

## 2. Description générale
### 2.1 Contexte utilisateur
L’utilisateur accède à l’application via un navigateur web. L’interface se compose d’une zone de saisie pour ajouter une tâche et d’une liste affichant toutes les tâches existantes. Chaque tâche est accompagnée d’une case à cocher (pour changer le statut) et d’un bouton de suppression.

### 2.2 Contraintes techniques
- Framework : Next.js (App Router)
- Gestionnaire de paquets : pnpm
- Styling : Tailwind CSS
- Base de données : SQLite
- ORM : Prisma
- Langage : TypeScript

## 3. Exigences fonctionnelles
EF01 – Visualiser la liste des tâches
Description : L’utilisateur voit l’ensemble des tâches enregistrées, avec leur titre et leur statut actuel.

Règles de validation :
- Les tâches sont affichées dans l’ordre de création (de la plus ancienne à la plus récente).
- Le statut est représenté visuellement (case cochée ou non, texte barré optionnel).

Scénario Gherkin :
```gherkin
Etant donne que l'utilisateur a deja cree des taches
Quand il consulte la page principale
Alors la liste des taches est affichee
  Et chaque tache montre son titre
  Et chaque tache montre son statut (fait ou a faire)

Exemples:
| titre       | statut initial |
|-------------|----------------|
| Acheter du lait | a faire   |
| Envoyer rapport | fait       |
```

EF02 – Ajouter une tâche
Description : L’utilisateur peut créer une nouvelle tâche en fournissant un titre.

Règles de validation :
- Le titre est obligatoire.
- Le titre ne peut pas être vide ni composé uniquement d’espaces.
- Longueur maximale du titre : 200 caractères.
- Une fois créée, la tâche apparaît immédiatement dans la liste avec le statut « à faire ».

Scénario Gherkin :
```gherkin
Etant donne que l'utilisateur est sur la page principale
Quand il saisit "Reviser le cours SDD" dans le champ de titre
  Et qu'il valide l'ajout
Alors une nouvelle tache "Reviser le cours SDD" avec le statut "a faire" est ajoutee a la liste

Etant donne que l'utilisateur est sur la page principale
Quand il tente d'ajouter une tache avec un titre vide
Alors un message d'erreur "Le titre ne peut pas etre vide" est affiche
  Et aucune tache n'est creee
```

EF03 – Modifier le statut d’une tâche
Description : L’utilisateur peut basculer le statut d’une tâche entre « à faire » et « fait ».

Règles de validation :
- Le changement est immédiat et persistant.
- L’interface reflète le nouveau statut sans rechargement de page.

Scénario Gherkin :
```gherkin
Etant donne une tache existante avec le titre "Appeler le client" et le statut "a faire"
Quand l'utilisateur coche la case correspondante
Alors le statut de la tache devient "fait"
  Et la tache peut etre visuellement distinguee (ex: texte barre)

Etant donne une tache existante avec le titre "Appeler le client" et le statut "fait"
Quand l'utilisateur decoche la case
Alors le statut de la tache redevient "a faire"
```

EF04 – Supprimer une tâche
Description : L’utilisateur peut supprimer définitivement une tâche.

Règles de validation :
- Une action de confirmation n’est pas exigée (action directe).
- La tâche disparaît immédiatement de la liste.

Scénario Gherkin :
```gherkin
Etant donne une tache existante avec le titre "Faire les courses"
Quand l'utilisateur clique sur l'icone de suppression de cette tache
Alors la tache "Faire les courses" n'apparait plus dans la liste
  Et elle est definitivement supprimee de la base de donnees
```

EF05 – Persistance des données
Description : Les tâches sont conservées entre les sessions de navigation.

Règles de validation :
- Après fermeture et réouverture du navigateur, l’utilisateur retrouve ses tâches dans l’état où il les avait laissées.

Scénario Gherkin :
```gherkin
Etant donne que l'utilisateur a cree les taches T1 et T2
Quand il ferme le navigateur puis le rouvre
  Et qu'il accede a l'application
Alors les taches T1 et T2 sont toujours presentes avec leurs statuts respectifs
```

## 4. Exigences d’interface utilisateur (texte)
### 4.1 Page principale
- En‑tête : titre de l’application « Todo List ».
- Zone de saisie : champ texte avec un placeholder « Ajouter une tâche… ».
- Bouton d’ajout : libellé « + » ou « Ajouter ».
- Liste des tâches :
  - Chaque ligne contient :
    - Une case à cocher reflétant le statut (cochée = fait).
    - Le titre de la tâche.
    - Un bouton « Supprimer » (icône poubelle ou texte).
  - Si la tâche est « fait », le titre peut être barré (optionnel).
- Message d’erreur : s’affiche temporairement en cas de titre invalide.

### 4.2 Comportement attendu
- L’ajout et la modification de statut se font sans rechargement de page (AJAX / client-side updates).
- La liste est triée par date de création croissante.

## 5. Règles de gestion et validation des données
| Champ | Règle |
|-------|-------|
| Titre | Obligatoire, non vide, max 200 caractères, sans formatage particulier. |
| Statut | Booléen (false = à faire, true = fait). Valeur par défaut false à la création. |

## 6. Exigences de qualité (non fonctionnelles)
- Maintenabilité : le code suivra les principes SOLID, DRY, KISS. Chaque fonction sera commentée.
- Testabilité : les règles métier seront isolées pour permettre des tests unitaires.
- Compatibilité : l’interface doit être fonctionnelle sur les navigateurs modernes (Chrome, Firefox, Safari, Edge) et sur les écrans de taille mobile (> 320 px).

