import {
  analyzePastDreams,
  continueDream,
  createDream,
  deleteDream,
  getDream,
  getDreams,
  getLastDreamsAnalysis,
  getProgressOnGeneralAnalysis,
} from '@/shared/api/entities/dream/dream.api';
import { CreateDreamDto } from '@/shared/api/entities/dream/dream.types';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getDreamKeys = ['dream'];

export const useGetDreamById = (id: string) => {
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: getDreamKeys,
    queryFn: () => getDream(id),
  });

  return { data, isLoading, isFetching, isError };
};

const getDreamsKeys = ['dreams'];
export const useGetDreams = (limit = 10) => {
  return useInfiniteQuery({
    refetchInterval: 100000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    queryKey: getDreamsKeys,
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getDreams({ lastDreamId: pageParam, limit: String(limit) }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (!lastPage?.length) return undefined;
      return lastPage[lastPage.length - 1].id; // предполагаем, что lastPage — массив снэпов
    },
  });
};

export const useCreateDream = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: [...getDreamsKeys],
    mutationFn: (payload: CreateDreamDto) => createDream(payload),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: getProgressOnGeneralAnalysisKeys,
      });
      void queryClient.invalidateQueries({
        queryKey: getDreamsKeys,
      });
    },
  });

  const createDreamFunction = async (payload: CreateDreamDto) => {
    return await mutateAsync(payload);
  };

  return {
    createDreamFunction,
    isPending,
    isError,
  };
};

export const useDeleteDream = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (id: string) => deleteDream(id),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: [...getDreamsKeys, ...getProgressOnGeneralAnalysisKeys],
      });
    },
  });

  const deleteDreamFunction = async (id: string) => {
    return await handleMutation(() => mutateAsync(id));
  };

  return {
    deleteDreamFunction,
    isPending,
    isError,
  };
};

export const useContinueDream = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (id: string) => continueDream(id),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: getDreamKeys,
      });
    },
  });

  const continueDreamFunction = async (id: string) => {
    return await handleMutation(() => mutateAsync(id));
  };

  return {
    continueDreamFunction,
    isPending,
    isError,
  };
};

const getProgressOnGeneralAnalysisKeys = ['progressOnGeneralAnalysis'];
export const useGetProgressOnGeneralAnalysis = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [...getProgressOnGeneralAnalysisKeys, ...getDreamKeys],
    queryFn: () => getProgressOnGeneralAnalysis(),
  });

  return { data, isLoading, isError };
};

export const useAnalyzePastDreams = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: () => analyzePastDreams(),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: ['lastDreamsAnalysis'],
      });
      void queryClient.invalidateQueries({
        queryKey: getProgressOnGeneralAnalysisKeys,
      });
    },
  });

  const analyzePastDreamsFunction = async () => {
    return await handleMutation(() => mutateAsync());
  };

  return {
    analyzePastDreamsFunction,
    isPending,
    isError,
  };
};

export const useGetLastDreamsAnalysis = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['lastDreamsAnalysis'],
    queryFn: () => getLastDreamsAnalysis(),
  });

  return { data, isLoading, isError };
};
