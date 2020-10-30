import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { styles, appColors, windowWidth } from '../../styles';
import { Cases } from '../../services/firestore';
import { StepButton } from '../../components/StepButton';
import { Typography } from '../../components/Typography';
import { CircleButton } from '../../components/CircleButton';
import { ArrowIcon } from '../../assets/icons';
import { shuffle, mapForAnamense, mapForExame, mapForConduta, mapForDiagnostico, mapForComunicacoes, getScore, getMaxScore, findObjectInListByTag } from '../../tools/functions';
import { CheckBox } from '../../components/CheckBox';
import { Modal } from '../../components/Modal';
import { AlertScreen } from '../dialogs/AlertScreen';
import { Container } from '../../components/Container';
import { meansure } from '../../tools/resolution';
import { ConfigurationScreen } from '../dialogs/ConfigurationScreen';

const image = { uri: "https://reactjs.org/logo-og.png" };

const ThinkCircles = require('../../assets/images/think-circles.png');

const CogImage = require('../../assets/images/cog.png');
const HelpImage = require('../../assets/images/help.png');
const HomeImage = require('../../assets/images/home.png');
const MedicalRecordImage = require('../../assets/images/record.png');

const gameplayScreenplay = require('../../screenplay/gameplay.json');

const IsPlayerSpeech = (step) => step <= 1 || step >= 6;
const IsPatientSpeech = (step) => step <= 1 || step >= 6;

export const GameScreen = ({ route, navigation, ...props }) => {
  const currentCase = route.params.caso;

  const [currentStep, setCurrentStep] = React.useState(1);
  const [gameData, setGameData] = React.useState(null);
  const [speechDone, setSpeechDone] = React.useState(false);
  const [feedbackContent, setFeedbackContent] = React.useState({
    isSpeech: true,
    text: '',
    visible: false
  });
  const [paginationIndex, setPaginationIndex] = React.useState(0);
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null
  });

  const scoreAnim = React.useRef(new Animated.Value(0)).current;

  const getOptions = () => {
    const { options } = gameData[gameplayScreenplay.etapas[currentStep].key];
    if (!options) { console.log("No options for " + gameplayScreenplay.etapas[currentStep].key) }
    return options || [];
  }

  React.useEffect(() => {
    async function loadCasesAsync() {
      const { avatar } = route.params;
      // const cases = Cases.show();
      // setLoadedCases();

      // Randomize options
      const optionsShuffled = {
        anamnese: shuffle(mapForAnamense(currentCase.anamnese)),
        exame_clinico: shuffle(mapForExame(currentCase.exame_fisico)),
        exame_complementar: shuffle(mapForExame(currentCase.exame_complementar)),
        diagnostico: shuffle(mapForDiagnostico(currentCase.diagnostico_inicial)),
        tratamento: shuffle(mapForConduta(currentCase.tratamento)),
        comunicacao: mapForComunicacoes(currentCase.comunicacao_tratamento.comunicacoes)
      };
      setGameData({
        avatar,
        anamnese: { options: optionsShuffled.anamnese, score: 0, maxScore: getMaxScore(optionsShuffled.anamnese), aux: {} },
        exame_clinico: { options: optionsShuffled.exame_clinico, score: 0, maxScore: getMaxScore(optionsShuffled.exame_clinico), aux: {} },
        exame_complementar: { options: optionsShuffled.exame_complementar, score: 0, maxScore: getMaxScore(optionsShuffled.exame_complementar), aux: {} },
        diagnostico: { options: optionsShuffled.diagnostico, score: 0, maxScore: getMaxScore(optionsShuffled.diagnostico), aux: {} },
        tratamento: { options: optionsShuffled.tratamento, score: 0, maxScore: getMaxScore(optionsShuffled.tratamento), aux: {} },
        comunicacao: { options: optionsShuffled.comunicacao, score: 0, maxScore: 90 },
        images: {
          background: findObjectInListByTag(currentCase.imagens, 'identificador', 'default-background').arquivo.replace(/(\/media)+/, '/media'),
          character: findObjectInListByTag(currentCase.imagens, 'identificador', 'default-character').arquivo.replace(/(\/media)+/, '/media')
        }
      });
    }

    loadCasesAsync();
  }, []);

  const handleRecordPress = () => navigation.navigate('MedicalRecord', {
    data: gameData
  });

  function handleMenu() {
    setModal({
      visible: true,
      modal: <AlertScreen message={'Voltar para o menu?'} onConfirm={() => navigation.navigate('Menu')} />
    });
  }

  function handleConfiguration() {
    setModal({
      visible: true,
      modal: <ConfigurationScreen />
    });
  }

  const handlePaginationPress = () => {
    if (speechDone) {
      if (currentStep === 3 || currentStep === 5) {
        handleNextStep();
      } else {
        setPaginationIndex(old => old === Math.floor(getOptions().length / 2) - 1 ? 0 : ++old);
      }
    } else {
      setSpeechDone(true);
    }
  }

  const handleOptionPress = (optionIndex) => () => {
    const option = getOptions()[optionIndex];
    setGameData(old => {
      const stepData = old[gameplayScreenplay.etapas[currentStep].key];
      stepData.options[optionIndex] = { ...option, checked: true };
      stepData.score += getScore(option);
      Animated.timing(scoreAnim, {
        duration: 300,
        useNativeDriver: false,
        toValue: stepData.score
      }).start();

      return old;
      // const stepOptions = old[getRef(currentStep)];
      // stepOptions[optionIndex] = { ...option, checked: true };
      // return { ...old, [getRef(currentStep)]: stepOptions }
    });
    setFeedbackContent({
      isSpeech: IsPatientSpeech(currentStep),
      text: option.feedback,
      visible: true
    });

    // setGameData(old => {
    //   old.anamnese[optionIndex] = { ...options, checked: true };
    //   return ({ ...old, anamnese: }); // This creates a new list equals the old one, if we use the old, the component won't update it's state.
    // });
  }

  const handleEndGame = () => {
    const { caso } = route.params;
    navigation.navigate('Ending', { caso, data: gameData });
  }

  const handleOptionPressAsRadio = (optionIndex) => () => {
    const option = getOptions()[optionIndex];
    setGameData(old => {
      const stepData = old[gameplayScreenplay.etapas[currentStep].key];
      stepData.options = stepData.options.map((o, i) => ({ ...o, checked: i === optionIndex }))
      if (currentStep === 3) {
        stepData.aux.initialDiagnosis = option;

      }
      stepData.score = getScore(option);
      stepData.aux.finalDiagnosis = option;
      return { ...old, [gameplayScreenplay.etapas[currentStep].key]: { ...stepData, aux: { ...stepData.aux, initial: stepData[optionIndex] } } };
    });
  }

  const handleNextStep = () => {
    setSpeechDone(false);
    setPaginationIndex(0);
    if (currentStep === 5 && gameData.diagnostico.aux.finalDiagnosis?.tipo !== "+") {
      handleEndGame();
      return;
    }
    setCurrentStep(old => {
      ++old;
      if (gameData[gameplayScreenplay.etapas[old].key].length === 0) {
        ++old;
      }
      return old;
    });

    if (currentStep != 3 && currentStep != 7) {
      navigation.navigate('MedicalRecord', {
        data: gameData,
        page: currentStep > 3 ? currentStep - 1 : currentStep
      });
    }
  }

  React.useEffect(() => {
    if (gameData) {
      setFeedbackContent({ visible: false });
    }
  }, [paginationIndex, currentStep]);

  if (!gameData) {
    return null;
  }

  console.log('render');
  return (
    <Container containerStyle={{ backgroundColor: 'black' }}>
      <ImageBackground style={styles.flex} source={{ uri: gameData.images.background }}>
        <ImageBackground style={styles.flex} source={{ uri: gameData.images.character }} resizeMode="contain">
          {/* Ícone de prontuário (direita) */}
          <CircleButton size={meansure(5)} style={{ position: 'absolute', top: meansure(2), left: meansure(2) }} onPress={handleRecordPress}>
            <Image source={MedicalRecordImage} style={{ height: meansure(3), width: meansure(3) }} resizeMode='contain' />
          </CircleButton>

          {/* Ícones brancos da esquerda */}
          <View style={[styles.spacedRow, { position: 'absolute', top: meansure(2), right: meansure(7) }]}>
            <CircleButton size={meansure(3)} style={{ marginRight: meansure(1) }}>
              <Image source={HelpImage} style={{ height: meansure(2), width: meansure(2) }} resizeMode='contain' />
            </CircleButton>
            <CircleButton size={meansure(3)} style={{ marginRight: meansure(1) }} onPress={handleMenu}>
              <Image source={HomeImage} style={{ height: meansure(2), width: meansure(2) }} resizeMode='contain' />
            </CircleButton>
            <CircleButton size={meansure(3)} onPress={handleConfiguration}>
              <Image source={CogImage} style={{ height: meansure(2), width: meansure(2) }} resizeMode='contain' />
            </CircleButton>
          </View>

          {/* Barra de pontuação */}
          <View style={styles.scoreBar}>
            <Animated.View style={{
              height: currentStep === 0 ? 0 : scoreAnim.interpolate({
                inputRange: [0, gameData[gameplayScreenplay.etapas[currentStep].key].maxScore],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp'
              }),
              backgroundColor: appColors.activeStep
            }} />
          </View>

          {/* Caixa de feedback do paciente e resultado de exames */}
          {feedbackContent.visible && (
            <View style={[styles.feedbackBox, { backgroundColor: feedbackContent.isSpeech ? '#ACDCCE' : appColors.cardGray }]}>
              <Typography>{feedbackContent.text}</Typography>
            </View>
          )}

          {/* Caixa de fala e pensamento do jogador */}
          <View style={[gameStyles.playerSpeechThinkBox, { zIndex: speechDone ? -1 : 1, backgroundColor: speechDone ? '#ACDCCE' : '#FFF', paddingLeft: meansure(speechDone ? 6 : 4) }]}>
            <View style={[styles.spacedRow, { flexGrow: 1 }]}>
              {!speechDone
                ? (
                  <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                    <Typography variant="header34">{gameplayScreenplay.etapas[currentStep].fala_inicial}</Typography>
                  </View>
                )
                : (
                  currentStep !== 0
                    ? (
                      <View style={{ flexShrink: 1, justifyContent: 'space-between' }}>
                        {(currentStep === 3 || currentStep == 5)
                          ? (
                            getOptions().map((option, i) => (
                              <CheckBox
                                label={option.texto}
                                onPress={handleOptionPressAsRadio(i)}
                                checked={option.checked}
                                style={{ flexGrow: 1 }}
                                key={i}
                              />
                            ))
                          )
                          : (
                            getOptions().slice(2 * paginationIndex, 2 * (1 + paginationIndex)).map((option, i) => (
                              <CheckBox
                                label={option.texto}
                                onPress={handleOptionPress(2 * paginationIndex + i)}
                                checked={option.checked}
                                style={{ flexGrow: 1 }}
                                key={i}
                              />
                            ))
                          )
                        }
                      </View>
                    )
                    : (
                      <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                        <Typography variant="header34">Olá! Como você se chama?</Typography>
                      </View>
                    )
                )
              }

              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: meansure(2) }}>
                {(!speechDone || currentStep !== 3 || gameData.diagnostico.options.filter(d => d.checked).length !== 0) && (
                  <TouchableOpacity activeOpacity={0.9} onPress={handlePaginationPress}>
                    <ArrowIcon color='#1BA488' width={meansure(4)} height={meansure(6)} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Imagem do médico */}
          <View style={gameStyles.avatarContainer}>
            <View style={{ position: 'relative' }}>
              <Image source={gameData.avatar} style={gameStyles.avatar} />
              {!speechDone && <Image source={ThinkCircles} style={gameStyles.thinkCircles} />}
            </View>
          </View>

          <View style={[styles.spacedRow, { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'flex-end' }]}>
            <StepButton style={{ flexGrow: 1 }} title={'Anamnese'} step={1} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
            <StepButton style={{ flexGrow: 1 }} title={'Exame Clínico'} step={2} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
            <StepButton style={{ flexGrow: 1 }} title={'Exames Complementares'} step={4} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
            <StepButton style={{ flexGrow: 1 }} title={'Diagnóstico'} step={5} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
            <StepButton style={{ flexGrow: 1 }} title={'Conduta'} step={6} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
            <StepButton style={{ flexGrow: 1 }} title={'Comunicação'} step={7} activeStep={currentStep}
              currentStep={currentStep}
              onPress={handleNextStep}
            />
          </View>
        </ImageBackground>
      </ImageBackground>

      <Modal
        visible={modal.visible}
        onClose={() => setModal({ modal: null, visible: false })}
      >
        {modal.modal}
      </Modal>
    </Container>
  );
}

const gameStyles = StyleSheet.create({
  avatar: {
    width: meansure(13),
    height: meansure(13),
    borderRadius: meansure(1),
    elevation: 3
  },
  avatarContainer: {
    position: 'absolute',
    left: meansure(2),
    bottom: meansure(7)
  },
  playerSpeechThinkBox: {
    position: 'absolute',
    right: meansure(2),
    left: meansure(10),
    bottom: meansure(7),
    height: meansure(9),
    paddingRight: meansure(3),
    paddingVertical: meansure(1),
    borderRadius: meansure(4),
    elevation: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.8
  },
  thinkCircles: {
    width: meansure(4),
    height: meansure(4),
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: 0
  }
});