import { Activity } from '../models/activity';

export const createBlankActivity = (): Activity => ({
  id: Date.now(),
  title: 'Nouvelle Activité',
  image: 'https://via.placeholder.com/300',
  description: '',
  steps: [],
  category: 'Aventure',
  duration: 30,
  level: '1'
});