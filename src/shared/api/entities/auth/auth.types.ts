export type InitDtoRequest = {
  displayName: string;
  appToken: string;
  local: string;
};

export type InitDtoResponse = {
  accessToken: string;
  user: {
    id: string;
    userName: string | null;
    displayName: string;
    avatarUrl: string | null;
    languageCode: string;
    role: string;
    appToken: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface MeResponse {
  user: {
    id: string;
    locale: string;
  };
}
