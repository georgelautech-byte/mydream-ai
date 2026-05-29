import { api } from '../../api';
import { apiConfig } from '../../apiConfig';
import { InitDtoRequest, InitDtoResponse } from './auth.types';

export const init = async (payload: InitDtoRequest) => {
  return (await api.post<Promise<InitDtoResponse>>(apiConfig.auth.init, payload)).data;
};

export const me = async () => {
  return await api.get(apiConfig.auth.me);
};
