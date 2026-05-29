import { appIcons } from '@/entities/appIcons/icons.mock';
import Button from '@/shared/ui/buttons/Button';
import SettingItem from '@/shared/ui/elements/SettingsItem';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import {
  getAppIconName,
  resetAppIcon,
  setAlternateAppIcon,
  supportsAlternateIcons,
  type AlternateAppIcons,
} from 'expo-alternate-app-icons';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Modal } from 'react-native';
import AppIcon from '../../../assets/images/icons_ios/icon-a.png';
import AppIconItem from './AppIconItem';

export default function AppIconsPicker() {
  const { t } = useTranslation();
  const [currentAppIconName, setCurrentAppIconName] = useState<string | null>(getAppIconName());

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  const handleSetAppIcon = useCallback(
    async (iconName: AlternateAppIcons) => {
      try {
        const newAppIconName = await setAlternateAppIcon(iconName);

        setCurrentAppIconName(newAppIconName);
      } catch (error) {
        if (error instanceof Error) Alert.alert('Error', error.message);
      }
    },
    [setCurrentAppIconName],
  );

  const handleReset = useCallback(async () => {
    try {
      await resetAppIcon();

      setCurrentAppIconName(null);
    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message);
    }
  }, [setCurrentAppIconName]);

  const currentAppIcon = appIcons.find(icon => icon.name === currentAppIconName);

  if (!supportsAlternateIcons) {
    return null;
  }

  return (
    <Grid>
      <SettingItem
        onPress={toggleModal}
        leftIcon={
          <Image
            source={currentAppIcon ? currentAppIcon?.image : AppIcon}
            style={{ height: 30, width: 30, borderRadius: 10 }}
          />
        }
        title={t('settings-page.app-icon')}
      />
      <Modal transparent visible={open} onRequestClose={toggleModal}>
        <ModalContainer onClose={toggleModal}>
          <Grid width="90%">
            <Paper color={'#000000b9'}>
              <Grid space="lg">
                <Typography weight="bold" textAlign="center" variant="title-2">
                  {t('settings-page.pick-icon')}
                </Typography>
                <Grid row space="md" justfity="center" wrap>
                  {appIcons.map((icon, index) => (
                    <AppIconItem
                      isPicked={icon.name === currentAppIconName}
                      onPress={handleSetAppIcon}
                      key={index}
                      name={icon.name}
                      image={icon.image}
                    />
                  ))}
                </Grid>
                <Button onPress={handleReset} variant="text">
                  {t('settings-page.reset')}
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </Grid>
  );
}
