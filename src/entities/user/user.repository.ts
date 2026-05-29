import { updateUser } from '@/shared/api/entities/user/user.api';
import { UserUpdateDto } from '@/shared/api/entities/user/user.types';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

type UseUpdateUserMutationParams = {
  id: string;
  user: UserUpdateDto;
};

export function useUpdateUser() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (params: UseUpdateUserMutationParams) => updateUser(params.id, params.user),
  });

  const updateUserFn = async (params: UseUpdateUserMutationParams) => {
    return await handleMutation(() => mutateAsync({ id: params.id, user: params.user }));
  };

  useEffect(() => {
    errorLogger.logError(error?.message || 'Error updating user');
  }, [isError]);

  return { updateUserFn, isPending };
}
