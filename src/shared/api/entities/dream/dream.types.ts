export type CreateDreamDto = {
  inputText: string;
  isPublic?: boolean;
  pickerDate?: Date;
  sleepTime?: Date;
  wakeTime?: Date;
  wakeUpsCount?: number;
  sleepQuality?: number;
  stressLevel?: number;
  moodAfter?: string;
  foodBeforeBed?: string;
};

export type GetDreamDto = {
  id: string;
  title: string;
  inputText: string;
  analyzeText: string;
  continuation?: string;
  coverImage?: string;
  isPublic: boolean;
  pickerDate: string;
  createdAt: Date;
  updatedAt: Date;
  userId: any;
};

export type DreamsQueryDto = {
  lastDreamId?: string;
  limit?: string;
};

export type AnalyzePastDreamsResponseDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  analysis: PastDreamsAnalysisResponse;
  amountOfDreams: number | null;
  lastDreamId: string | null;
};

export interface PastDreamsAnalysisResponse {
  themes: string[];
  emotions: string[];
  repeatingElements: string[];
  psychologicalInsights: string;
  advice: string;
  summary: string;
  colors: [string, string, string]; // строго три HEX-цвета
}
