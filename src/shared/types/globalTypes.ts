export type LANGUAGE = 'ru' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'pl' | 'tr' | 'nl' | 'sv' | 'cs';
export type GENDER = 'male' | 'female' | 'non-binary';

export type ZODIAC_SIGN =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type GOALS =
  | 'Jornaling'
  | 'Understanding dreams'
  | 'Have lucid dreams'
  | 'Get to know myself better'
  | 'Find the patterns';

export type AGE = 'Below 18' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

export interface SleepDataResponse {
  summary: string;
  tone: string;
  characters: {
    name: string;
    role: string;
  }[];
  recurring_elements: string[];
  interpretations: {
    esoteric: string;
    scientific: string;
    self_development: string;
    freudian: string;
    jungian: string;
  };
  tags: string[];
}
