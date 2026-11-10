// Q1

interface ClientId {
  getValeur(): string;
}
interface ProduitId {
  getValeur(): string;
}

const c: ClientId = { getValeur: () => "ABC" };
const p: ProduitId = c;

// Q2
type ID<Tag extends string> = string & { readonly marque: Tag };
type DocId = ID<"doc">;
