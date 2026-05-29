export const apiConfig = {
  auth: {
    init: '/auth/init',
    me: '/auth/me',
  },
  dream: {
    post: '/dream',
    get: '/dream',
    getById: (id: string) => `/dream/${id}`,
    delete: (id: string) => `/dream/${id}`,
    update: (id: string) => `/dream/${id}`,
    continueDream: (id: string) => `/dream/continueDream/${id}`,
    analyzePastDreams: '/dream/analyzePastDreams',
    getProgressOnGeneralAnalysis: '/dream/getProgressOnGeneralAnalysis',
    getLastDreamsAnalysis: '/dream/getLastDreamsAnalysis',
  },
  user: {
    post: '/user',
    get: '/user',
    getById: (id: string) => `/user/${id}`,
    delete: (id: string) => `/user/${id}`,
    update: (id: string) => `/user/${id}`,
  },
  openai: {
    transcribe: '/openai/transcribe',
  },
};
