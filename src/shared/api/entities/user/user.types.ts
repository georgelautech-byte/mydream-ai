export type UserGetDto = {
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

export type UserUpdateDto = {
  userName?: string;
  languageCode?: string;
  displayName?: string;
  appToken?: string;
};
