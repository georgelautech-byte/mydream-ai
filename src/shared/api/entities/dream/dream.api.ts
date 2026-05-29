import { api } from '@/shared/api/api';
import { apiConfig } from '@/shared/api/apiConfig';
import { AnalyzePastDreamsResponseDto, CreateDreamDto, DreamsQueryDto, GetDreamDto } from './dream.types';

export const getDreams = async (params?: DreamsQueryDto) => {
  return (await api.get<Promise<GetDreamDto[]>>(apiConfig.dream.get, { params })).data;
};

export const getDream = async (id: string) => {
  return (await api.get<Promise<GetDreamDto>>(apiConfig.dream.getById(id))).data;
};

export const createDream = async (payload: CreateDreamDto) => {
  return (await api.post<Promise<GetDreamDto>>(apiConfig.dream.post, payload)).data;
};

export const deleteDream = async (id: string) => {
  return (await api.delete<Promise<GetDreamDto>>(apiConfig.dream.delete(id))).data;
};

export const continueDream = async (id: string) => {
  return (await api.post<Promise<GetDreamDto>>(apiConfig.dream.continueDream(id))).data;
};

export const analyzePastDreams = async () => {
  return (await api.post<Promise<AnalyzePastDreamsResponseDto>>(apiConfig.dream.analyzePastDreams)).data;
};

export const getProgressOnGeneralAnalysis = async () => {
  return (await api.post<Promise<{ current: Number; total: number }>>(apiConfig.dream.getProgressOnGeneralAnalysis))
    .data;
};

export const getLastDreamsAnalysis = async () => {
  return (await api.post<Promise<AnalyzePastDreamsResponseDto>>(apiConfig.dream.getLastDreamsAnalysis)).data;
};
