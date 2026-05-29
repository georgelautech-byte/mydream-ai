import { api } from '../../api';
import { apiConfig } from '../../apiConfig';
import { UserGetDto, UserUpdateDto } from './user.types';

export const updateUser = async (id: string, payload: UserUpdateDto) => {
  return (await api.patch<Promise<UserGetDto>>(apiConfig.user.update(id), payload)).data;
};
