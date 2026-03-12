import { Activity } from '../models/activity';

export const activities: Activity[] = [
  {
    id: 1,
    title: "Place de la Comédie",
    image: "https://images.pexels.com/photos/15073996/pexels-photo-15073996.jpeg",
    description: "Découvrez le cœur de Montpellier.",
    category: "historic",
    duration: 30,
    level: "beginner",
    steps: [
      {
        id: 1,
        description: "Rendez-vous devant l'Opéra.",
        poiLat: 43.6087,
        poiLng: 3.8792,
        radius: 20,
        missions: [
          {
            id: 101,
            type: 'text',
            instruction: "Combien de statues voyez-vous sur le toit ?",
            expectedAnswer: "3",
            victoryCondition: "exact"
          }
        ]
      }
    ]
  }
];
