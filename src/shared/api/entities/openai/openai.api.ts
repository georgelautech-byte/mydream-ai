import { api } from '../../api';
import { apiConfig } from '../../apiConfig';

export const transcibe = async (formData: FormData) => {
  return (
    await api.post<string>(apiConfig.openai.transcribe, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
};
