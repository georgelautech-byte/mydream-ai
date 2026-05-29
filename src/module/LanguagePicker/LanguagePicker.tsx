import { languages } from '@/shared/config/constants/languages/languages';
import { useLang } from '@/shared/hooks/useLangStore';
import { useTheme } from '@/shared/hooks/useTheme';
import SettingsItem from '@/shared/ui/elements/SettingsItem';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import { normalizedSize } from '@/shared/utils/size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal } from 'react-native';
import LangItem, { ITEM_HEIGHT } from './LangItem';

export default function LanguagePicker() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const currentIndex = languages.findIndex(l => l.code === lang);

  const [open, setOpen] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const toggleModal = () => setOpen(prev => !prev);

  // Scroll to selected language when modal opens
  useEffect(() => {
    if (open && currentIndex >= 0) {
      // slight delay to allow FlatList to render
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
      }, 100);
    }
  }, [open, currentIndex]);
  return (
    <Grid>
      <SettingsItem
        leftIcon={<MaterialIcons name="language" size={24} color={colors.text.primary} />}
        title={t('settings-page.language-title')}
        onPress={toggleModal}
        rightPrefix={languages[currentIndex]?.label}
      />
      <Modal visible={open} animationType="fade" transparent>
        <ModalContainer onClose={toggleModal}>
          <Grid width="90%">
            <Paper color="#000000ab" width="100%" space="sm">
              <Typography textAlign="center" variant="title-2">
                {t('settings-page.language-title')}
              </Typography>

              <FlatList
                ref={flatListRef}
                data={languages}
                keyExtractor={item => item.code}
                getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
                initialScrollIndex={currentIndex}
                style={{ maxHeight: normalizedSize(400) }}
                renderItem={({ item, index }) => (
                  <LangItem
                    isPicked={lang === item.code}
                    label={item.label}
                    flag={item.flag}
                    onPress={() => {
                      setLang(item.code);
                      toggleModal();
                    }}
                  />
                )}
              />
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </Grid>
  );
}
