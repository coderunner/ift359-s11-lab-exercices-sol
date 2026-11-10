// ============================================================================
// Types marqués (Branded Types)
// ============================================================================

export type ID<DataType> = string & { readonly __marque: DataType };

export type ClientId = ID<"client">;
export type ProduitId = ID<"produit">;

// Constructeurs intelligents
export function creerClientId(id: string): ClientId {
  return id as ClientId;
}

export function creerProduitId(id: string): ProduitId {
  return id as ProduitId;
}

// Fonction qui attend spécifiquement un ClientId et un ProduitId
export function commanderProduit(client: ClientId, produit: ProduitId): string {
  return `Le client ${client} commande le produit ${produit}`;
}
