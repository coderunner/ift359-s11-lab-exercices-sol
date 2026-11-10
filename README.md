# Laboratoire — IFT359 : Types marqués, types opaques et classes de types

Ce laboratoire comporte deux exercices :

1. **Partie 1 — Types marqués (_Branded Types_) et Types opaques (_Opaque Types_)**
2. **Partie 2 — Le problème d'expression et les classes de types (_Typeclasses_)**

---

## Partie 1 : Types marqués et types opaques

Dans cet exercice d'exploration (`src/partie1/`), les implémentations vous sont déjà fournies :

- `src/partie1/identifiants.ts` : Définit les types marqués `ClientId` et `ProduitId` (basés sur `string`).
- `src/partie1/paire-opaque.ts` : Définit le type opaque `Paire<A, B>` à l'aide d'un `unique symbol` privé au module.
- `src/partie1/exercices.ts` : Contient **5 manipulations courtes** et **5 questions** auxquelles répondre directement en commentaire dans le fichier, ainsi qu'une petite fonction `echanger` à implémenter à la manipulation 5.

---

## Partie 2 : Le problème d'expression et les classes de types

Dans cet exercice (`src/partie2/`), vous allez mettre en pratique les **classes de types (_typeclasses_)** en TypeScript à l'aide de tables d'indexation et de registres d'adaptateurs pour pallier le **problème d'expression**.

- `src/partie2/formes.ts` : Contient le domaine des formes géométriques, l'exemple complet de la classe de types `Affichable<T>`, ainsi que les sections `TODO` à compléter :
  - **Partie 1 — Ajouter une nouvelle opération sans modifier le code existant :** Implémenter la classe de types `CalculableAire<T>`, ses adaptateurs, son registre `RegistreAire` et la fonction polymorphe `aire(forme: Forme): number`.
  - **Partie 2 — Ajouter un nouveau type :** Ajouter le type `Carre` à l'union `Forme` et constater comment le compilateur TypeScript vous guide vers les registres à mettre à jour, sans jamais modifier les fonctions `afficher` et `aire`.
- `test/partie2/formes.test.ts` : Suite de tests unitaires validant chaque étape de votre implémentation de la Partie 2.

---

## Commandes disponibles

| Commande             | Description                                                                 |
| :------------------- | :-------------------------------------------------------------------------- |
| `npm run test`       | Exécute la suite de tests une fois.                                         |
| `npm run test:watch` | Exécute les tests en continu et relance à chaque sauvegarde.                |
| `npm run build`      | Vérifie les types avec le compilateur TypeScript (`tsc`) et génère `dist/`. |
