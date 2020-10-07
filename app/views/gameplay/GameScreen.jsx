import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { styles, appColors, windowWidth } from '../../styles';
import { Cases } from '../../services/firestore';
import { StepButton } from '../../components/StepButton';
import { Typography } from '../../components/Typography';
import { CircleButton } from '../../components/CircleButton';
import { ArrowIcon } from '../../assets/icons';
import { shuffle, mapForAnamense, mapForExame, mapForConduta, mapForDiagnostico, mapForComunicacoes, getScore, getMaxScore } from '../../tools/functions';
import { CheckBox } from '../../components/CheckBox';
import { Modal } from '../../components/Modal';
import { AlertScreen } from '../dialogs/AlertScreen';

const image = { uri: "https://reactjs.org/logo-og.png" };

const ThinkCircles = require('../../assets/images/think-circles.png');

const CogImage = require('../../assets/images/cog.png');
const HelpImage = require('../../assets/images/help.png');
const HomeImage = require('../../assets/images/home.png');
const MedicalRecordImage = require('../../assets/images/record.png');

const steps = [
  'queixa', // 0
  'anamnese', // 1
  'exame_clinico', // 2
  'diagnostico', // 3
  'exame_complementar', // 4
  'diagnostico', // 5
  'tratamento', // 6
  'comunicacao' // 7
];

const speechs = [
  "Iniciando um novo dia de trabalho... Que casos vou atender hoje?",
  "Que perguntas farei na anamnese?",
  "Quais exames clínicos vou realizar?",
  "De acordo com os exames clínicos, minha hipótese diagnóstica é...",
  "Quais exames complementares vou pedir?",
  "O diagnóstico para este caso é...",
  "De acordo com os exames e diagnóstico, eu irei...",
  "O que direi ao paciente?"
];

const IsPlayerSpeech = (step) => step <= 1 || step >= 6;
const IsPatientSpeech = (step) => step <= 1 || step >= 6;

export const GameScreen = ({ route, navigation, ...props }) => {
  const [currentCase, setCurrentCase] = React.useState(require('../../test/cases.json')[0]);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [gameData, setGameData] = React.useState(null);
  const [speechDone, setSpeechDone] = React.useState(false);
  const [feedbackContent, setFeedbackContent] = React.useState({
    isSpeech: true,
    text: '',
    visible: false
  });
  const [paginationIndex, setPaginationIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const scoreAnim = React.useRef(new Animated.Value(0)).current;

  const getOptions = () => {
    const { options } = gameData[steps[currentStep]];
    if (!options) { console.log("No options for " + steps[currentStep]) }
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
        comunicacao: { options: optionsShuffled.comunicacao, score: 0, maxScore: 90 }
      });
    }

    loadCasesAsync();
  }, []);

  const handleRecordPress = () => navigation.navigate('MedicalRecord', {
    data: gameData
  });

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
      const stepData = old[steps[currentStep]];
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
      const stepData = old[steps[currentStep]];
      stepData.options = stepData.options.map((o, i) => ({ ...o, checked: i === optionIndex }))
      if (currentStep === 3) {
        stepData.aux.initialDiagnosis = option;
        stepData.score = 2 * getScore(option);
      } else {
        stepData.score = getScore(stepData.aux.initialDiagnosis) + getScore(option);
      }
      stepData.aux.finalDiagnosis = option;
      return { ...old, [steps[currentStep]]: { ...stepData, aux: { ...stepData.aux, initial: stepData[optionIndex] } } };
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
      if (gameData[steps[old].length === 0]) {
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
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={image}>
        <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://www.justica.gov.br/imagens/coracao.png/@@images/image.png' }} resizeMode="contain">
          {/* Ícone de prontuário (direita) */}
          <CircleButton size={75} style={{ position: 'absolute', top: 30, left: 30 }} onPress={handleRecordPress}>
            <Image source={MedicalRecordImage} style={{ height: 45, width: 45 }} resizeMode='contain' />
          </CircleButton>

          {/* Ícones brancos da esquerda */}
          <View style={[styles.spacedRow, { width: 175, position: 'absolute', top: 30, right: 105 }]}>
            <CircleButton size={45}>
              <Image source={HelpImage} style={{ height: 30, width: 30 }} resizeMode='contain' />
            </CircleButton>
            <CircleButton size={45} onPress={() => setModalVisible(true)}>
              <Image source={HomeImage} style={{ height: 30, width: 30 }} resizeMode='contain' />
            </CircleButton>
            <CircleButton size={45}>
              <Image source={CogImage} style={{ height: 30, width: 30 }} resizeMode='contain' />
            </CircleButton>
          </View>

          {/* Barra de pontuação */}
          <View style={{ position: 'absolute', right: 30, top: 30, borderRadius: 15, backgroundColor: appColors.cardGray, overflow: 'hidden', flexDirection: 'column-reverse', width: 30, height: 240 }}>
            <Animated.View style={{
              height: currentStep === 0 ? 0 : scoreAnim.interpolate({
                inputRange: [0, gameData[steps[currentStep]].maxScore],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp'
              }),
              backgroundColor: appColors.activeStep
            }} />
          </View>

          {/* Caixa de feedback do paciente e resultado de exames */}
          {feedbackContent.visible && (
            <View
              style={{
                position: 'absolute', right: 105, bottom: 340, width: 300, paddingHorizontal: 30,
                paddingVertical: 15, minHeight: 90, backgroundColor: feedbackContent.isSpeech ? '#ACDCCE' : appColors.cardGray,
                alignItems: 'center', justifyContent: 'center', borderRadius: 30
              }}
            >
              <Typography>{feedbackContent.text}</Typography>
            </View>
          )}

          {/* Caixa de fala e pensamento do jogador */}
          <View style={[gameStyles.playerSpeechThinkBox, { zIndex: speechDone ? 0 : 1, backgroundColor: speechDone ? '#ACDCCE' : '#FFF' }]}>
            <View style={[styles.spacedRow, { flexGrow: 1 }]}>
              {!speechDone
                ? (
                  <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                    <Typography variant="header34">{speechs[currentStep]}</Typography>
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

              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}>
                {(!speechDone || currentStep !== 3 || gameData.diagnostico.options.filter(d => d.checked).length !== 0) && (
                  <TouchableOpacity activeOpacity={0.9} onPress={handlePaginationPress}>
                    <ArrowIcon color='#1BA488' width={60} height={90} />
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

      {/* <Modal
        message={'Voltar para o menu?'}
        visible={modalVisible}
        onConfirm={() => navigation.goBack()}
        onCancel={() => setModalVisible(false)}
      >
        <AlertScreen />
      </Modal> */}
    </View >
  );
}

const gameStyles = StyleSheet.create({
  avatar: {
    width: 195,
    height: 195,
    borderRadius: 15
  },
  avatarContainer: {
    position: 'absolute',
    left: 30,
    bottom: 105
  },
  playerSpeechThinkBox: {
    position: 'absolute',
    right: 30,
    bottom: 105,
    width: windowWidth - 210,
    height: 150,
    paddingLeft: 60,
    paddingRight: 45,
    paddingVertical: 15,
    borderRadius: 45
  },
  thinkCircles: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: 0
  }
});