import { useTheme } from '@/shared/hooks/useTheme';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from 'zeego/dropdown-menu';

interface DropdownOptionsProps {
  onDelete: () => void;
}

export default function DropdownOptions({ onDelete }: DropdownOptionsProps) {
  const { t } = useTranslation();
  const colors = useTheme();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <WrapIconInPressable>
          <SimpleLineIcons name="options" size={24} color={colors.text.primary} />
        </WrapIconInPressable>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onDelete} destructive key="delete">
          <DropdownMenu.ItemTitle>{t('dream-page.delete-title')}</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon ios={{ name: 'trash' }} />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
