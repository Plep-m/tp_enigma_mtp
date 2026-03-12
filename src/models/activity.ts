export type Etape = {
  titre: string;
  poi: string;
  description: string;
  condition_victoire: string;
  reponse: string;
  radius: number;
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  uri: string;
  etapes: Etape[];
};
