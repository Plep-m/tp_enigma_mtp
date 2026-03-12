import { Activity } from '../models/activity';

export const createBlankActivity = (): Activity => ({
  id: Date.now(),
  title: '',
  description: '',
  uri: '',
  etapes: [],
  source: 'admin'
});