export type AdminModel = {
  currentActivity: Activity | null;
  generatedQRCode: string | null;
  isScanning: boolean;
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  uri: string;
  etapes: Etape[];
};

export type Etape = {
  titre: string;
  poi: string;
  description: string;
  condition_victoire: string;
  reponse: string;
  radius: number;
};

export const createBlankActivity = (): Activity => ({
  id: Date.now(),
  title: '',
  description: '',
  uri: '',
  etapes: []
});

export const createBlankEtape = (): Etape => ({
  titre: '',
  poi: '',
  description: '',
  condition_victoire: '1',
  reponse: '',
  radius: 50
});