import {Activity} from "../models/activity"
export const activities: Activity[] = [
{
    id: 1,
    title: "Place de la Comedie",
    image: "https://images.pexels.com/photos/15073996/pexels-photo-15073996.jpeg",
    description:"La place de la Comédie à Montpellier constitue un point de départ idéal pour votre découverte de la ville",
    steps: [
      {
        id: 1,
        time: 90,
        description: "Valide les missions de cette étape pour continuer.",
        poiLat: 43.6087,
        poiLng: 3.8792,
        radius: 20,
        missions: [],
      },
    ],
  },
  
];
