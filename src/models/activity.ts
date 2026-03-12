export type Mission = {
  id: number;
  type: "quiz" | "photo";
  instruction: string;
  question?: string;
  expectedAnswer?: string;
};

export type Step = {
  id: number;
  time: number;
  description: string;
  poiLat: number;
  poiLng: number;
  radius: number;
  missions: Mission[];
};

export type Activity = {
  id: number;
  title: string;
  image: string;
  description: string;
  steps: Step[];
};