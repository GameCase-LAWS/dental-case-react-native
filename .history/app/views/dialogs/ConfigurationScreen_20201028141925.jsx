import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../styles';
import { Typography } from '../../components/Typography';
import { CloseIcon } from '../../assets/icons';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';
import { meansure } from '../../tools/resolution';
import { LocalStorage, localStorageKeys } from '../../services/localStorage';

export const ConfigurationScreen = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [vibrationEnabled, setVibrationEnabled] = React.useState();
  const [soundEnabled, setSoundEnabled] = React.useState();
  const [language, setLanguage] = React.useState();

  React.useEffect(() => {
    async function loadConfigAsync() {
      const vibrationPromise = LocalStorage.retrieve(localStorageKeys.VIBRATION_ENABLED, 1);
      const soundPromise = LocalStorage.retrieve(localStorageKeys.SOUND_ENABLED, 0);
      const languagePromise = LocalStorage.retrieve(localStorageKeys.LANGUAGE, 'pt-br');

      await Promise.all([vibrationPromise, soundPromise, languagePromise])
        .then(values => {
          setVibrationEnabled(values[0] === 1);
          setSoundEnabled(values[1] === 1);
          setLanguage(values[2]);

          setIsLoaded(true);
        })
        .catch(error => {
          console.error(error);
        })
    }

    loadConfigAsync();
  }, []);

  if (!isLoaded) {
    return (
      null
    );
  }

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  const handleSoundChange = status => () => {
    LocalStorage.store(localStorageKeys.SOUND_ENABLED, Number(status));
    setSoundEnabled(status);
  }

  const handleVibrationChange = status => () => {
    LocalStorage.store(localStorageKeys.VIBRATION_ENABLED, Number(status));
    setVibrationEnabled(status);
  }

  const handleLanguageChange = language => () => {
    LocalStorage.store(localStorageKeys.LANGUAGE, language);
    setLanguage(language);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.closeBtn} onPress={handleClose}>
        <CloseIcon color={appColors.primary} height={meansure(1.5)} width={meansure(1.5)} />
      </TouchableOpacity>

      <Typography bold paragraph variant="header34" style={{ textAlign: 'center' }}>Configurações</Typography>
      <View>
        {/* Sons */}
        <View style={styles.labelBtnRow}>
          <View style={styles.labelColumn}>
            <Typography variant="header34">Sons</Typography>
          </View>
          <Grid container spacingX={meansure(1)} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button disabled={soundEnabled} label='On' onPress={handleSoundChange(true)} />
            </Grid>
            <Grid item size={6}>
              <Button disabled={!soundEnabled} label='Off' onPress={handleSoundChange(false)} />
            </Grid>
          </Grid>
        </View>

        {/* Vibração */}
        <View style={styles.labelBtnRow}>
          <View style={styles.labelColumn}>
            <Typography variant="header34">Vibração</Typography>
          </View>
          <Grid container spacingX={meansure(1)} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button disabled={vibrationEnabled} label='On' onPress={handleVibrationChange(true)} />
            </Grid>
            <Grid item size={6}>
              <Button disabled={!vibrationEnabled} label='Off' onPress={handleVibrationChange(false)} />
            </Grid>
          </Grid>
        </View>

        {/* Língua */}
        <View style={styles.labelBtnRow}>
          <View style={styles.labelColumn}>
            <Typography variant="header34">Língua</Typography>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Button onPress={handleLanguageChange('pt-br')} disabled={language === 'pt-br'} label='Português' buttonStyle={styles.buttonStyle} />
            <Button onPress={handleLanguageChange('es')} disabled={language === 'es'} label='Espanhol' buttonStyle={styles.buttonStyle} />
            <Button onPress={handleLanguageChange('en-us')} disabled={language === 'en-us'} label='Inglês' buttonStyle={[styles.buttonStyle, { marginBottom: meansure(1) }]} />

            <Button label='Fale Conosco' buttonStyle={{ flexGrow: 1 }} style={{ backgroundColor: appColors.activeStep }} />
          </View>
        </View>
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {loadedCases && loadedCases
          .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
        }
        .map((case) => <CaseCard title={case.titulo} />)}
      </View>
      {loadedCases && loadedCases.length > 3 && <View />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: meansure(8),
    paddingVertical: meansure(1),
    width: meansure(48),
    height: meansure(32)
  },
  closeBtn: {
    position: 'absolute',
    right: meansure(1),
    top: meansure(1)
  },
  labelColumn: {
    width: meansure(10)
  },
  labelBtnRow: {
    flexDirection: 'row',
    marginBottom: meansure(1)
  },
  buttonStyle: {
    flexGrow: 1,
    marginBottom: meansure(0.5)
  }
});