export type MissionType = 'photo' | 'quiz' | 'math' | 'text' | 'observation' | 'action' | 'input' | 'scan' | 'gps';

export interface Mission {
  id: number;
  type: MissionType;
  instruction: string;
  question?: string;
  expectedAnswer?: string;
  victoryCondition?: string;
}

export interface Step {
  id: number;
  description: string;
  poiLat: number;
  poiLng: number;
  radius: number;
  missions: Mission[];
}

export interface Activity {
  id: number;
  title: string;
  image: string;
  description: string;
  steps: Step[];
  category?: string;
  duration?: number;
  level?: string;
  source?: 'admin' | 'imported';
}

// Legacy type for backwards compatibility
export type Etape = {
  titre: string;
  poi: string;
  description: string;
  condition_victoire: string;
  reponse: string;
  radius: number;
};
