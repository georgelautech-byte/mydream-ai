export type InitUserType = {
  displayName: string;
};

export type UserType = {
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
