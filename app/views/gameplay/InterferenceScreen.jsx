import React from 'react';
import { View, ImageBackground, Image, Platform, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Typography } from '../../components/Typography';
import { ThemeContext } from '../../ThemeContext';
import { SpeechThink } from '../../components/SpeechThink';

import { shuffle } from '../../tools/functions';
import { appColors } from '../../styles';
import { GameVibration } from '../../services/utilities';

const ThinkCircles = require('../../assets/images/think-circles.png');
const PhoneCall = require("../../assets/images/call_interference.png");

const ImageContainer = ({ children, interferenceConfig, interference }) => {
  if (interference.key === "PACIENTE_DESCONTROLE_EMOCIAL") {
    return (
      <ImageBackground style={{ flex: 1, backgroundColor: interferenceConfig.backgroundColor }} source={interferenceConfig.backgroundImageUri} resizeMode="contain">
        {children}
      </ImageBackground>
    );
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={interferenceConfig.backgroundImageUri} resizeMode="contain">
      <ImageBackground style={{ flex: 1 }} source={{ uri: interferenceConfig.backgroundImagePatient }}>
        <View style={{ flex: 1, backgroundColor: interferenceConfig.backgroundColor }}>
          {children}
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}

export const InterferenceScreen = ({ route, navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const [interference, setInterference] = React.useState();
  const [arrowPagination, setArrowPagination] = React.useState(0);
  const [selectedOption, setSelectOption] = React.useState();
  const [interferenceConfig, setInterferenceConfig] = React.useState({
    backgroundColor: null,
    avatar: null,
    backgroundImage: null
  });

  React.useEffect(() => {
    const { interference, backgroundImage, backgroundImagePatient, avatar } = route.params;
    if (interference.vibrate) {
      GameVibration.vibrate();
    }
    if (interference.key !== "LIGACAO_CHEGANDO") {
      setInterferenceConfig({
        backgroundImageUri: { uri: backgroundImage },
        avatar, backgroundImagePatient,
        backgroundColor: (interference.key === "PACIENTE_DESCONTROLE_EMOCIAL")
          ? "#EC2529"
          : (interference.key === "FALTA_LUZ")
            ? '#000000A0'
            : "#EC2529A0"
      });
    }
    setArrowPagination(interference.inner_voice ? 0 : 1);
    setInterference({ ...interference, respostas: shuffle(interference.respostas) });
  }, []);

  const handleOptionPress = (optionIndex) => {
    setSelectOption({ option: interference.respostas[optionIndex], extraAction: null });
    setInterference(old => ({
      ...old,
      respostas: old.respostas.map((o, i) => ({ ...o, checked: i === optionIndex }))
    }));
  }

  const onOptionSelect = (option, extraAction) => () => {
    setSelectOption({ option, extraAction });
    handleArrowPress();
  }

  function handleArrowPress() {
    setArrowPagination(old => ++old);
    if (arrowPagination !== 0 && selectedOption) {
      const { onSelect } = route.params;
      if (onSelect) {
        navigation.goBack();
        onSelect(selectedOption);
      }
    }
  }

  if (!interference) {
    // console.log("No interference");
    return null;
  }

  if (interference.key === "LIGACAO_CHEGANDO") {
    const btnStyle = { width: theme.measure(8), height: theme.measure(8) };

    if (Platform.OS !== "web") {
      return (
        <Container containerStyle={{ backgroundColor: '#000' }}>
          <ImageBackground source={PhoneCall} style={{ flex: 1 }} resizeMode="contain">
            {/* Atender */}
            <TouchableOpacity onPress={onOptionSelect({ tipo: "-" }, "END_GAME")} style={[btnStyle, { position: 'absolute', bottom: theme.measure(4.5), left: theme.measure(8.5), backgroundColor: 'red' }]} />
            {/* Não atender */}
            <TouchableOpacity onPress={onOptionSelect({ tipo: "+" }, "END_VIBRATION")} style={[btnStyle, { position: 'absolute', top: theme.measure(5), left: theme.measure(8.5) }]} />
          </ImageBackground>
        </Container>
      );
    }

    return (
      <Container containerStyle={{ backgroundColor: '#000' }} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground source={PhoneCall} style={{ transform: [{ rotateZ: '-90deg' }], width: theme.measure(36), height: theme.measure(36 * 9 / 16) }} resizeMode="contain">
          {/* Atender */}
          <TouchableOpacity onPress={onOptionSelect({ tipo: "-" }, "END_GAME")} style={[btnStyle, { position: 'absolute', bottom: theme.measure(1), left: theme.measure(2) }]} />
          {/* Não atender */}
          <TouchableOpacity onPress={onOptionSelect({ tipo: "+" }, "END_VIBRATION")} style={[btnStyle, { position: 'absolute', top: theme.measure(1), left: theme.measure(2) }]} />
        </ImageBackground>
      </Container>
    );
  }

  const isSpeech = arrowPagination !== 0 && interference.is_speech;

  return (
    <Container containerStyle={{ backgroundColor: '#000' }}>
      <ImageContainer interferenceConfig={interferenceConfig} interference={interference}>
        {interference?.screen_text && (
          <View style={{ justifyContent: "center", alignItems: "center", height: theme.measure(20), paddingHorizontal: theme.measure(7), width: '100%' }}>
            <Typography bold
              variant="header48"
              color={appColors.highEmphasisWhiteText}
              style={{ textAlign: 'center' }}
            >
              {interference.screen_text}
            </Typography>
          </View>
        )}

        {/* Caixa de fala e pensamento do jogador */}
        <SpeechThink
          arrowBlink={arrowPagination === 0 || selectedOption}
          isSpeech={isSpeech}
          onArrowClick={handleArrowPress}
          onOptionPress={handleOptionPress}
          options={interference.respostas}
          showArrow={arrowPagination === 0 || selectedOption}
          showText={arrowPagination === 0}
          text={interference.inner_voice}
          styles={{ bottom: theme.measure(2) }}
        />

        {/* Imagem do médico */}
        <View style={[theme.styles.GameScreenAvatarContainer, { bottom: theme.measure(2) }]}>
          <View style={{ position: 'relative' }}>
            <Image source={interferenceConfig.avatar} style={theme.styles.GameScreenAvatar} />
            {!isSpeech && <Image source={ThinkCircles} style={theme.styles.GameScreenThinkCircles} />}
          </View>
        </View>
      </ImageContainer>
    </Container >
  );
}