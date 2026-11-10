import { describe, expect, test } from "vitest";
import {
  afficher,
  aire,
  aireCarre,
  aireCercle,
  aireRectangle,
  aireTriangle,
  carre,
  cercle,
  Forme,
  rectangle,
  registreAffichable,
  registreAire,
  triangle,
} from "../../src/partie2/formes.js";

describe("Partie 2 — Exemple fourni : Classe de types Affichable<T>", () => {
  test("affiche correctement un cercle, un rectangle et un triangle", () => {
    expect(afficher(cercle(5))).toBe("Cercle(rayon=5)");
    expect(afficher(rectangle(4, 6))).toBe("Rectangle(4x6)");
    expect(afficher(triangle(3, 8))).toBe("Triangle(base=3, hauteur=8)");
  });
});

describe("Partie 2.1 : Nouvelle opération CalculableAire<T>", () => {
  test("1.2 - les adaptateurs individuels calculent l'aire correctement", () => {
    expect(aireCercle.aire(cercle(10))).toBeCloseTo(Math.PI * 100);
    expect(aireRectangle.aire(rectangle(4, 5))).toBe(20);
    expect(aireTriangle.aire(triangle(6, 4))).toBe(12);
  });

  test("1.3 - registreAire contient les adaptateurs pour chaque forme de base", () => {
    expect(registreAire.cercle).toBe(aireCercle);
    expect(registreAire.rectangle).toBe(aireRectangle);
    expect(registreAire.triangle).toBe(aireTriangle);
  });

  test("1.4 - la fonction polymorphe aire(forme) calcule l'aire via le registre", () => {
    const formes: Forme[] = [cercle(2), rectangle(3, 5), triangle(10, 4)];
    const aires = formes.map(aire);

    expect(aires[0]).toBeCloseTo(Math.PI * 4);
    expect(aires[1]).toBe(15);
    expect(aires[2]).toBe(20);
  });
});

describe("Partie 2.2 : Ajout du type Carre (Problème d'expression)", () => {
  test("2.3 - le constructeur carre() crée un objet Carre valide", () => {
    const c = carre(5);
    expect(c).toEqual({ type: "carre", cote: 5 });
  });

  test("2.4 - afficher() fonctionne avec un Carre grâce au registreAffichable", () => {
    const c = carre(5) as unknown as Forme;
    expect((registreAffichable as Record<string, unknown>).carre).toBeDefined();
    expect(afficher(c)).toBe("Carre(cote=5)");
  });

  test("2.5 - aire() fonctionne avec un Carre grâce au registreAire", () => {
    const c = carre(5);
    expect(aireCarre.aire(c)).toBe(25);
    expect((registreAire as Record<string, unknown>).carre).toBe(aireCarre);
    expect(aire(c as unknown as Forme)).toBe(25);
  });
});
