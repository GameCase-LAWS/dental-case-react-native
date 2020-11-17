import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CloseIcon } from "../../assets/icons";
import { appColors } from "../../styles";

import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";
import { LocalStorage, localStorageKeys } from "../../services/localStorage";
import { ThemeContext } from "../../ThemeContext";
// import { Authentication } from "../../services/auth";

import PropTypes from "prop-types";

export const ConfigurationScreen = ({ allowLanguageChange, onClose }) => {
  const { theme } = React.useContext(ThemeContext);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [vibrationEnabled, setVibrationEnabled] = React.useState();
  const [soundEnabled, setSoundEnabled] = React.useState();
  const [language, setLanguage] = React.useState();

  React.useEffect(() => {
    async function loadConfigAsync() {
      const vibrationPromise = LocalStorage.retrieve(
        localStorageKeys.VIBRATION_ENABLED,
        1,
      );
      const soundPromise = LocalStorage.retrieve(
        localStorageKeys.SOUND_ENABLED,
        0,
      );
      const languagePromise = LocalStorage.retrieve(
        localStorageKeys.LANGUAGE,
        "pt-br",
      );

      await Promise.all([vibrationPromise, soundPromise, languagePromise])
        .then((values) => {
          setVibrationEnabled(values[0] === 1);
          setSoundEnabled(values[1] === 1);
          setLanguage(values[2]);

          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    loadConfigAsync();
  }, []);

  if (!isLoaded) {
    return null;
  }

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  const handleSoundChange = (status) => () => {
    LocalStorage.store(localStorageKeys.SOUND_ENABLED, Number(status));
    setSoundEnabled(status);
  };

  const handleVibrationChange = (status) => () => {
    LocalStorage.store(localStorageKeys.VIBRATION_ENABLED, Number(status));
    setVibrationEnabled(status);
  };

  const handleLanguageChange = (language) => () => {
    LocalStorage.store(localStorageKeys.LANGUAGE, language);
    setLanguage(language);
  };

  return (
    <View style={theme.styles.ConfigurationScreen_container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={theme.styles.ConfigurationScreen_closeBtn}
        onPress={handleClose}
      >
        <CloseIcon
          color={appColors.primary}
          height={theme.measure(1.5)}
          width={theme.measure(1.5)}
        />
      </TouchableOpacity>

      <Typography
        bold
        paragraph
        variant='header34'
        style={{ textAlign: "center" }}
      >
        Configurações
      </Typography>
      <View>
        {/* Sons */}
        <View style={theme.styles.ConfigurationScreen_labelBtnRow}>
          <View style={theme.styles.ConfigurationScreen_labelColumn}>
            <Typography variant='header34'>Sons</Typography>
          </View>
          <Grid container spacingX={theme.measure(1)} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button
                disabled={soundEnabled}
                label='On'
                onPress={handleSoundChange(true)}
              />
            </Grid>
            <Grid item size={6}>
              <Button
                disabled={!soundEnabled}
                label='Off'
                onPress={handleSoundChange(false)}
              />
            </Grid>
          </Grid>
        </View>

        {/* Vibração */}
        <View style={theme.styles.ConfigurationScreen_labelBtnRow}>
          <View style={theme.styles.ConfigurationScreen_labelColumn}>
            <Typography variant='header34'>Vibração</Typography>
          </View>
          <Grid container spacingX={theme.measure(1)} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button
                disabled={vibrationEnabled}
                label='On'
                onPress={handleVibrationChange(true)}
              />
            </Grid>
            <Grid item size={6}>
              <Button
                disabled={!vibrationEnabled}
                label='Off'
                onPress={handleVibrationChange(false)}
              />
            </Grid>
          </Grid>
        </View>

        {/* Língua */}
        <View style={theme.styles.ConfigurationScreen_labelBtnRow}>
          <View style={theme.styles.ConfigurationScreen_labelColumn}>
            <Typography variant='header34'>Língua</Typography>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Button
              onPress={handleLanguageChange("pt-br")}
              disabled={!allowLanguageChange || language === "pt-br"}
              label='Português'
              buttonStyle={theme.styles.ConfigurationScreen_buttonStyle}
            />
            <Button
              onPress={handleLanguageChange("es")}
              disabled={!allowLanguageChange || language === "es"}
              label='Espanhol'
              buttonStyle={theme.styles.ConfigurationScreen_buttonStyle}
            />
            <Button
              onPress={handleLanguageChange("en-us")}
              disabled={!allowLanguageChange || language === "en-us"}
              label='Inglês'
              buttonStyle={[
                theme.styles.ConfigurationScreen_buttonStyle,
                { marginBottom: theme.measure(1) },
              ]}
            />

            <Button
              label='Fale Conosco'
              buttonStyle={{ flexGrow: 1 }}
              style={{ backgroundColor: appColors.activeStep }}
              buttonStyle={theme.styles.ConfigurationScreen_buttonStyle}
            />
            {/* <Button
              onPress={() => Authentication.deleteUser()}
              label='Deletar minha conta'
              buttonStyle={{ flexGrow: 1 }}
              style={{ backgroundColor: appColors.warning }}
              buttonStyle={theme.styles.ConfigurationScreen_buttonStyle}
            /> */}
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
};

ConfigurationScreen.propTypes = {
  allowLanguageChange: PropTypes.bool,
};

ConfigurationScreen.defaultProps = {
  allowLanguageChange: false,
};
