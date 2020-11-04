import React from 'react';
import { View, ImageBackground, Image, Platform, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Typography } from '../../components/Typography';
import { ThemeContext } from '../../ThemeContext';
import { appColors } from '../../styles';
import { SpeechThink } from '../../components/SpeechThink';

const ThinkCircles = require('../../assets/images/think-circles.png');
const PhoneCall = require("../../assets/images/call_interference.png");

const interferences = require("../../screenplay/interference.json");

export const InterferenceScreen = ({ route, navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const [interference, setInterference] = React.useState();
  const [interferenceConfig, setInterferenceConfig] = React.useState({
    backgroundColor: null,
    avatar: null,
    backgroundImage: null
  });

  React.useEffect(() => {
    // const { interference, backgroundImage, avatar } = route.params;
    const interf = interferences.interferences[2];
    if (interf.key !== "LIGACAO_CHEGANDO") {
      setInterferenceConfig({
        backgroundImage: null,
        avatar: null,
        backgroundColor: interf.key === "PACIENTE_DESCONTROLE_EMOCIAL" ? "#EC2529" : "#EC2529A0"
      });
    }
    setInterference(interf);
  }, []);

  const onOptionSelect = (option, extraAction) => () => {
    if (!option) {
      if (extraAction) {
        navigation.goBack();
      }
    } else {
      const { onSelect } = route.params;
      if (onSelect) {
        onSelect(option, extraAction);
        navigation.goBack();
      }
    }
  }

  if (!interference) {
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

  const isSpeech = false;

  return (
    <Container>
      <ImageBackground style={[theme.styles.flex, { backgroundColor: interferenceConfig.backgroundColor || 'transparent' }]} source={{ uri: interferenceConfig.backgroundImage }} resizeMode="contain">
        {interference?.screen_text && (
          <View style={{ justifyContent: "center", alignItems: "center", height: theme.measure(20), width: '100%' }}>
            <Typography bold variant="header48" color={appColors.highEmphasisWhiteText}>{interference.screen_text}</Typography>
          </View>
        )}

        {/* Caixa de fala e pensamento do jogador */}
        <SpeechThink
          arrowBlink={true}
          isSpeech={isSpeech}
          onArrowClick={() => { }}
          onOptionPress={() => { }}
          options={[]}
          showArrow={true}
          showText={true}
          text={''}
        />

        {/* Imagem do médico */}
        <View style={theme.styles.GameScreenAvatarContainer}>
          <View style={{ position: 'relative' }}>
            <Image source={interferenceConfig.avatar} style={theme.styles.GameScreenAvatar} />
            {!isSpeech && <Image source={ThinkCircles} style={theme.styles.GameScreenThinkCircles} />}
          </View>
        </View>
      </ImageBackground>
    </Container >
  );
}