// ============================================================================
// EXERCICE 1 : Exploration des types marqués et des types opaques
// ============================================================================
// Instructions :
// Pour chacune des 5 manipulations ci-dessous :
// 1. Décommentez la ligne de code indiquée par "// À DÉCOMMENTER".
// 2. Observez le comportement du compilateur TypeScript (dans votre éditeur
//    ou en exécutant `npm run build` / `npm run dev`).
// 3. Répondez à la question en commentaire, puis recommentez la ligne si elle
//    cause une erreur de compilation avant de passer à la suivante.
// ============================================================================

import { ClientId, commanderProduit, creerClientId, creerProduitId, ProduitId } from "./identifiants.js";
import { deuxieme, Paire, paire, premier } from "./paire-opaque.js";

const idClient: ClientId = creerClientId("C-101");
const idProduit: ProduitId = creerProduitId("P-999");

console.log(commanderProduit(idClient, idProduit));

// ----------------------------------------------------------------------------
// Manipulation 1 : Inverser deux types marqués partageant le même type de base
// ----------------------------------------------------------------------------
// Bien que `ClientId` et `ProduitId` soient tous deux des `string` à l'exécution,
// essayez de passer `idClient` à la place de `idProduit` (ou d'assigner l'un à l'autre) :

// const produitErrone: ProduitId = idClient; // À DÉCOMMENTER
// commanderProduit(idProduit, idClient); // À DÉCOMMENTER

// QUESTION 1 :
// Pourquoi TypeScript refuse-t-il cette assignation alors que son système de
// typage est structurel et que les deux valeurs sont de simples `string` à l'exécution ?
// RÉPONSE :
// Parce que le type ClientId et ProduitId on un champ supplémentaire définit (__marque) qui diffère l'un de l'autre.
// Donc pour le compilateur, les types sont incompatibles.

// ----------------------------------------------------------------------------
// Manipulation 2 : Compatibilité entre un type marqué et son type de base
// ----------------------------------------------------------------------------
// Testez les deux assignations suivantes (A et B) :

// A) Assigner un ClientId dans une variable de type string :
const chaineSimple: string = idClient;
console.log("ClientId utilisé comme string :", chaineSimple.toUpperCase());

// B) Assigner une string ordinaire dans une variable de type ClientId :
// const fauxClientId: ClientId = "C-101"; // À DÉCOMMENTER

// QUESTION 2 :
// Pourquoi l'assignation A (`ClientId` -> `string`) est-elle acceptée sans erreur,
// tandis que l'assignation B (`string` -> `ClientId`) est refusée par le compilateur ?
// RÉPONSE :
// Le type de chaineSimple est string. Le type ClientId est une string ET un attribut supplémentaire (__marque).
// Pour le compilateur il est possible d'assigner le ClientId à une string, car les types sont compatibles.

// ----------------------------------------------------------------------------
// Manipulation 3 : Forger un objet littéral pour contourner un type opaque
// ----------------------------------------------------------------------------
// On sait qu'à l'intérieur du module `paire-opaque.ts`, une paire est représentée
// par un objet `{ _1: premier, _2: deuxieme }`.
// Essayez de passer directement un objet littéral ayant cette forme à `premier()` :

const p1: Paire<number, string> = paire(42, "bonjour");
console.log("Premier élément :", premier(p1));

const faussePaire = { _1: 42, _2: "bonjour" };
// premier(faussePaire); // À DÉCOMMENTER

// QUESTION 3 :
// Si `Paire<A, B>` avait simplement été non exportée (sans utiliser `unique symbol`),
// `premier(faussePaire)` aurait compilé à cause du typage structurel.
// Qu'est-ce qui empêche `faussePaire` d'être acceptée ici ?
// RÉPONSE :
// Parce que le type attendu par premier est le type externe Paire<A, B>. Ce type ne contient qu'un champ dont le nom
// est un symbole unique. faussePaire n'a pas cette forme et donc son type n'est pas compatible pour le compilateur.

// ----------------------------------------------------------------------------
// Manipulation 4 : Accéder directement à la représentation interne d'un type opaque
// ----------------------------------------------------------------------------
// Essayez de lire directement la propriété `._1` sur `p1` (sans passer par `premier(p1)`),
// puis affichez `p1` avec `console.log(p1)` :

// console.log(p1._1); // À DÉCOMMENTER
console.log("Objet p1 à l'exécution :", p1);

// QUESTION 4 :
// Que remarquez-vous entre ce que `console.log(p1)` affiche à l'exécution et
// ce que le compilateur vous autorise à faire avec `p1._1` ? Pourquoi ?
// RÉPONSE :
// Le compilateur n'autorise pas _1, car pour lui, p1 n'a qu'un attribut nommé avec un symbole unique
// même si en réalité p1 possède effectivement l'attribut _1.

// ----------------------------------------------------------------------------
// Manipulation 5 : Écrire une fonction générique externe avec le type opaque
// ----------------------------------------------------------------------------
// TODO : Implémentez la fonction `echanger` ci-dessous qui inverse les deux
// éléments d'une `Paire<A, B>` pour retourner une `Paire<B, A>` en utilisant
// uniquement la barrière d'abstraction exportée par `paire-opaque.ts`.

export function echanger<A, B>(p: Paire<A, B>): Paire<B, A> {
  return paire(deuxieme(p), premier(p));
}

// QUESTION 5 :
// Quel est l'avantage d'exposer le type opaque `Paire<A, B>` par rapport au fait
// de simplement ne pas mettre `export` devant `interface Paire<A, B>` ?
// RÉPONSE :
// Comme le type Paire est exporté, l'utilisateur peut le référencer à l'extérieur du module.
