import { useAuth } from '@/entities/auth/auth.repository';
import { useUpdateUser } from '@/entities/user/user.repository';
import { EnterNameScreen } from '@/module/OnboardingScreens';
import LoadingModal from '@/shared/ui/elements/LoadingModal';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { router } from 'expo-router';

export default function ChangeNamePage() {
  const { updateUserFn, isPending } = useUpdateUser();
  const { user, setUser } = useAuth();

  const updateName = async (name: string) => {
    if (user) {
      const res = await updateUserFn({ id: user.id, user: { displayName: name } });
      router.dismiss();

      setUser(res);
    }
  };

  return (
    <PageWrapper>
      <EnterNameScreen onChange={name => updateName(name)} />
      <LoadingModal open={isPending} />
    </PageWrapper>
  );
}
