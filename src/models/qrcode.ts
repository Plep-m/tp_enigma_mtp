import { encode as msgpackEncode, decode as msgpackDecode } from '@msgpack/msgpack';
import pako from 'pako';
import base45 from 'base45-js';
import { Activity } from './activity';

export type QRCodeModel = {
  encodedValue: string;
  decodedValue: Activity;
  size?: number;
};

const KEY_MAP: Record<string, string> = {
  id: 'i',
  title: 't',
  description: 'ds',
  steps: 's',
  missions: 'm',
  image: 'im',
  category: 'cat',
  duration: 'd',
  level: 'l',
  poiLat: 'lat',
  poiLng: 'lng',
  radius: 'rd',
  type: 'tp',
  instruction: 'ins',
  question: 'q',
  expectedAnswer: 'ans',
  victoryCondition: 'vc',
  // Legacy mappings for backwards compatibility
  uri: 'u',
  etapes: 'e',
  titre: 'tt',
  poi: 'p',
  condition_victoire: 'c',
  reponse: 'r'
};

const REVERSE_KEY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_MAP).map(([key, value]) => [value, key])
);

const mapKeys = (obj: any, dictionary: Record<string, string>): any => {
  if (Array.isArray(obj)) {
    return obj.map(item => mapKeys(item, dictionary));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = dictionary[key] || key;
      acc[newKey] = mapKeys(obj[key], dictionary);
      return acc;
    }, {} as any);
  }
  return obj;
};

export const encodeActivity = (obj: object): string => {
  const minifiedObj = mapKeys(obj, KEY_MAP);
  const packedBinary = msgpackEncode(minifiedObj);
  const deflatedBinary = pako.deflate(packedBinary);
  return base45.encode(deflatedBinary);
};

export const decodeActivity = <T,>(base45Str: string): T => {
  const deflatedBinary = base45.decode(base45Str);
  const packedBinary = pako.inflate(deflatedBinary);
  const minifiedObj = msgpackDecode(packedBinary);
  return mapKeys(minifiedObj, REVERSE_KEY_MAP) as T;
};
