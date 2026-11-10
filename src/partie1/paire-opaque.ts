// ============================================================================
// Type opaque (Opaque Type)
// ============================================================================

declare const PaireMarque: unique symbol;

// Représentation interne
interface PaireInterne<A, B> {
  readonly _1: A;
  readonly _2: B;
}

// Représentation externe
export interface Paire<A, B> {
  readonly [PaireMarque]: [A, B];
}

// Constructeur
export function paire<A, B>(premier: A, deuxieme: B): Paire<A, B> {
  const interne: PaireInterne<A, B> = { _1: premier, _2: deuxieme };
  return interne as unknown as Paire<A, B>;
}

// Sélecteurs
export function premier<A, B>(p: Paire<A, B>): A {
  return (p as unknown as PaireInterne<A, B>)._1;
}

export function deuxieme<A, B>(p: Paire<A, B>): B {
  return (p as unknown as PaireInterne<A, B>)._2;
}
