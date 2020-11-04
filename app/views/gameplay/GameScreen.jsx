import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { appColors } from "../../styles";
import { Cases } from "../../services/firestore";
import { StepButton } from "../../components/StepButton";
import { Typography } from "../../components/Typography";
import { CircleButton } from "../../components/CircleButton";
import { ArrowIcon } from "../../assets/icons";
import { Modal } from "../../components/Modal";
import { AlertScreen } from "../dialogs/AlertScreen";
import { Container } from "../../components/Container";
import { ConfigurationScreen } from "../dialogs/ConfigurationScreen";
import { ThemeContext } from "../../ThemeContext";
import { SpeechThink } from "../../components/SpeechThink";

import {
  shuffle,
  map,
  getMaxScore,
  findObjectInListByTag,
  getScore,
} from "../../tools/functions";
import { getRandomInterference } from "../../tools/interference";
import { GameVibration } from "../../services/utilities";

const ThinkCircles = require("../../assets/images/think-circles.png");

const CogImage = require("../../assets/images/cog.png");
const HelpImage = require("../../assets/images/help.png");
const HomeImage = require("../../assets/images/home.png");
const MedicalRecordImage = require("../../assets/images/record.png");

const gameplayScreenplay = require("../../screenplay/gameplay.json");

const IsPlayerSpeech = (step) => step <= 1 || step >= 6;
const IsPatientSpeech = (step) => step <= 1 || step >= 6;

export const GameScreen = ({ route, navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);
  const { caso: mCaso, avatar } = route.params;

  // Controla a etapa atual do jagador
  const [etapa, setEtapa] = React.useState(null);
  // Controla as opções e a quantidade das mesmas exibidas ao jogador
  const [options, setOptions] = React.useState({
    options: [],
    pagination: 0,
    perPage: 2,
  });
  // Controla as pontuação do jogador em cada etapa
  const [scores, setScores] = React.useState({
    anamnese: {
      score: 0,
      maxScore: 1,
    },
    exame_clinico: {
      score: 0,
      maxScore: 1,
    },
    exame_complementar: {
      score: 0,
      maxScore: 1,
    },
    diagnostico: {
      score: 0,
      maxScore: 1,
    },
    tratamento: {
      score: 0,
      maxScore: 1,
    },
    comunicacao: {
      score: 0,
      maxScore: 1,
    },
  });
  // Controla a paginação das falas
  const [speechControl, setSpeechControl] = React.useState({
    pagination: 0,
    enableOptions: false,
  });
  // Controla o Feedback do paciente / exames
  const [feedbackContent, setFeedbackContent] = React.useState({
    isSpeech: true,
    text: "",
    visible: false,
  });
  // Controla os modais de configuração e demais diálogos
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null,
  });
  // Controla as informações a serem salvas no DB e exibidas no prontuário
  const [gameData, setGameData] = React.useState({
    selections: {
      anamnese: [],
      exame_clinico: [],
      exame_complementar: [],
      tratamento: [],
      diagnostico: null,
      comunicacao: null,
    },
    avatar: avatar,
    interferenceState: 0,
    // 0 -> Não iniciada
    // 1 -> Ocorrendo
    // 2 -> Finalizada
    // 3 -> Acaba no final
    interference: null,
  });
  // Controla a animação da barra de score
  const scoreAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const etapaInicialIndex = 1;
    setEtapa({
      key: gameplayScreenplay.etapas[etapaInicialIndex].key,
      db_key: gameplayScreenplay.etapas[etapaInicialIndex].db_key,
      index: etapaInicialIndex,
    });

    if (true) {
      const interference = getRandomInterference(mCaso);
      setGameData((old) => ({ ...old, interference }));
    }
  }, []);

  React.useEffect(() => {
    if (etapa) {
      const options = map(
        etapa.index === 7
          ? mCaso.comunicacao_tratamento.comunicacoes
          : mCaso[etapa.db_key],
        etapa.key,
      ).filter((i) => i);
      if (options || etapa.index === 0) {
        setOptions({
          options: shuffle(options),
          pagination: 0,
          perPage: etapa.index == 3 || etapa.index == 5 ? 3 : 2,
        });

        if (etapa.index === 1) {
          // Se for anamnese, calcule o máximo de comunicacao também
          const maxAnamnese = getMaxScore(options, etapa.key, 0);
          setScores((old) => ({
            ...old,
            [etapa.key]: {
              maxScore: maxAnamnese,
              score: 0,
            },
            comunicacao: {
              score: 0,
              maxScore: maxAnamnese + 20000,
            },
          }));
        } else if (etapa.index !== 7 && etapa.index !== 5) {
          setScores((old) => ({
            ...old,
            [etapa.key]: {
              maxScore: getMaxScore(options, etapa.key, 0),
              score: 0,
            },
          }));
        }
      } else {
        handleNextStep();
      }
    }
  }, [etapa]);

  const handleRecordPress = () =>
    navigation.navigate("MedicalRecord", { data: gameData, scores: scores });

  function tryStartInterference(force) {
    if (gameData.interferenceState === 2) {
      return false;
    }
    if (gameData.interference) {
      if (gameData.interference.etapa === etapa.index) {
        const randomChance = Math.random() <= 0.3;
        const shouldOccure =
          gameData.interferenceState === 1 || force || randomChance;
        if (shouldOccure) {
          if (gameData.interference.responses_until_start === 0 || force) {
            navigation.navigate("Interference", {
              interference: gameData.interference,
              avatar: gameData.avatar,
              backgroundImage: findObjectInListByTag(
                mCaso.imagens,
                "identificador",
                gameData.interference.key === "PACIENTE_DESCONTROLE_EMOCIAL"
                  ? "character-interference"
                  : gameplayScreenplay.etapas[etapa.index].background_image,
              ).arquivo,
              backgroundImagePatient:
                gameData.interference.key !== "PACIENTE_DESCONTROLE_EMOCIAL" &&
                findObjectInListByTag(
                  mCaso.imagens,
                  "identificador",
                  gameplayScreenplay.etapas[etapa.index].patient_image,
                ).arquivo,
              onSelect: onInterferenceOptionSelect,
            });
            return false;
          } else {
            // A interferência vai ocorrer, mas depende de um determinado número de respostas do paciente
            return true;
          }
        }
      }
    }
    return false;
  }

  function onInterferenceOptionSelect({ option, extraAction }) {
    if (!option) {
      execAction(extraAction);
      return;
    }
    execAction(option.action);
    execAction(extraAction);

    const score = scores[etapa.key].score + getScore(option, etapa.key);

    // Adiciona score e renderizar a tela
    setScores((old) => ({
      ...old,
      [etapa.key]: {
        score: score,
        maxScore: old[etapa.key].maxScore + 20000,
      },
    }));
    animateScore(score);
  }

  function execAction(action) {
    switch (action) {
      case "END_VIBRATION":
        GameVibration.stop();
        break;
      case "END_GAME":
        console.log("Encerrando caso!");
        GameVibration.stop();
        handleEndGame();
        break;
      case "STOP_EFFECTS_ON_END":
        GameVibration.stop();
        break;
      case "END_SCREEN_EFFECTS":
        GameVibration.stop();
        break;
    }
    setGameData((old) => ({
      ...old,
      interferenceState: action === "STOP_EFFECTS_ON_END" ? 3 : 2,
    }));
  }

  function handleMenu() {
    setModal({
      visible: true,
      modal: (
        <AlertScreen
          message={"Voltar para o menu?"}
          onConfirm={() => navigation.navigate("Menu")}
        />
      ),
    });
  }

  function handleConfiguration() {
    setModal({
      visible: true,
      modal: <ConfigurationScreen allowLanguageChange={false} />,
    });
  }

  const handlePaginationPress = () => {
    if (etapa.index === 3 && gameData.selections.diagnostico) {
      handleNextStep();
    }

    // Verifica se as opções da etapa devem ser exibidas
    if (speechControl.enableOptions) {
      // Caso positivo, verifica o valor máximo da paginação e prossegue com a mesma
      const maxPage = Math.ceil(options.options.length / options.perPage) - 1;
      setOptions((old) => ({
        ...old,
        pagination: old.pagination === maxPage ? 0 : ++old.pagination,
      }));
    } else {
      // Caso negativo, verifica o valor máximo da paginação das falas
      const maxPage = gameplayScreenplay.etapas[etapa.index].falas.length - 1;

      // Verifica se chegou ao final das falas
      if (speechControl.pagination < maxPage) {
        // Caso negativo, prossegue com as falas
        setSpeechControl((old) => ({
          ...old,
          pagination: ++old.pagination,
        }));
      } else {
        // Caso positivo, verifica se a etapa possui opções para serem exibidas
        if ((etapa.db_key && mCaso[etapa.db_key]) || etapa.index === 7) {
          // Caso positivo, habilita a exibição das opções
          setSpeechControl({
            pagination: 0,
            enableOptions: true,
          });
        } else {
          // Caso negativo, passa para a próxima etapa
          handleNextStep();
        }
      }
    }
  };

  const handleOptionPress = (defaultOptionIndex) => (optionIndex) => {
    const opIndex = defaultOptionIndex + optionIndex;
    const option = options.options[opIndex];

    // Se a etapa for 3, 5 ou 7, o comportamento das opções é de um RadioButton
    if (etapa.index === 3 || etapa.index === 5 || etapa.index === 7) {
      const allOptions = options.options;
      setOptions((old) => ({
        ...old,
        options: allOptions.map((o, i) => ({ ...o, checked: i === opIndex })),
      }));
      if (etapa.index === 7) {
        if (gameData.selections.comunicacao) {
          scores[etapa.key].score +=
            getScore(option, etapa.key) -
            getScore(gameData.selections.comunicacao, etapa.key);
        } else {
          scores[etapa.key].score += getScore(option, etapa.key);
        }
      } else {
        scores[etapa.key].score = getScore(option, etapa.key);
      }
    } else {
      // Altera a pontuação do jogador, mas não renderiza a tela.
      scores[etapa.key].score += getScore(option, etapa.key);
      if (etapa.index == 1) {
        // Opções especiais
        scores.comunicacao.score += getScore(option, etapa.key);
      }
    }
    animateScore(scores[etapa.key].score);

    const interfStart = tryStartInterference();
    if (interfStart) {
      if (gameData.interference.forced_response) {
        if (gameData.interference.responses_until_start > 0) {
          // Muda execução mas não renderiza componente
          gameData.interferenceState = 1;
          gameData.interference.responses_until_start -= 1;
          if (option.feedback) {
            const text =
              gameData.interference.key === "RUIDOS_EXTERNOS"
                ? shuffle(option.feedback.split("")).join("")
                : gameData.interference.forced_response;
            setFeedbackContent({
              isSpeech: IsPatientSpeech(etapa.index),
              text,
              visible: true,
            });
          }
        } else {
          tryStartInterference(true);
        }
      }
    } else {
      if (option.feedback) {
        setFeedbackContent({
          isSpeech: IsPatientSpeech(etapa.index),
          text: option.feedback,
          visible: true,
        });
      }
    }

    // Isso marca a opção como selecionada, mas não renderiza novamente a tela.
    option.checked = true;

    // Salva os dados do jogo
    setGameData((old) => {
      let newData;
      if (etapa.key === "diagnostico" || etapa.key === "comunicacao") {
        newData = option;
      } else {
        newData = gameData.selections[etapa.key];
        newData.push(option);
      }
      return {
        ...old,
        selections: {
          ...old.selections,
          [etapa.key]: newData,
        },
      };
    });
  };

  const handleEndGame = () => {
    const { caso } = route.params;
    navigation.navigate("Ending", { caso, data: gameData, scores });
  };

  const handleNextStep = () => {
    const { index } = etapa;
    if (gameData.interference) {
      if (gameData.interferenceState === 3) {
        GameVibration.stop();
        // TODO - Os efeitos na tela devem ser removidos
      } else if (
        gameData.interference.etapa === index &&
        gameData.interferenceState !== 2
      ) {
        tryStartInterference(true);
        return;
      }
    }

    scoreAnim.setValue(0);

    // Caso o usuário tenha selecionado um diagnóstico final não adequado, o caso se encerra.
    if (
      index === 7 ||
      (index === 5 && gameData.selections.diagnostico?.tipo !== "+")
    ) {
      handleEndGame();
      return;
    }

    // Prossegue para a próxima etapa
    setEtapa((old) => {
      const newIndex = ++old.index;
      // console.log("Indo para index = " + newIndex);
      return {
        key: gameplayScreenplay.etapas[newIndex].key,
        db_key: gameplayScreenplay.etapas[newIndex].db_key,
        index: newIndex,
      };
    });

    setSpeechControl({
      pagination: 0,
      enableOptions: false,
    });

    // Caso deva, abre o prontuário médico
    if (index != 0 && index != 3 && index != 7) {
      navigation.navigate("MedicalRecord", {
        data: gameData,
        scores: scores,
        page: index > 3 ? index - 1 : index,
      });
    }
  };

  React.useEffect(() => {
    if (gameData) {
      setFeedbackContent({ visible: false });
    }
  }, [etapa, options.pagination]);

  if (!etapa) {
    return null;
  }

  function animateScore(value) {
    Animated.timing(scoreAnim, {
      duration: 300,
      useNativeDriver: false,
      toValue: value,
    }).start();
  }

  const isSpeech = speechControl.enableOptions
    ? gameplayScreenplay.etapas[etapa.index].options_speech
    : gameplayScreenplay.etapas[etapa.index].falas[speechControl.pagination]
        .is_speech;

  // console.log('render');

  return (
    <Container containerStyle={{ backgroundColor: "black" }}>
      <ImageBackground
        style={theme.styles.flex}
        source={{
          uri: findObjectInListByTag(
            mCaso.imagens,
            "identificador",
            gameplayScreenplay.etapas[etapa.index].background_image,
          ).arquivo,
        }}
        resizeMode='contain'
      >
        <ImageBackground
          style={theme.styles.flex}
          source={{
            uri: findObjectInListByTag(
              mCaso.imagens,
              "identificador",
              gameplayScreenplay.etapas[etapa.index].patient_image,
            ).arquivo,
          }}
          resizeMode='contain'
        >
          {/* Ícone de prontuário (direita) */}
          <CircleButton
            size={theme.measure(5)}
            style={[{
              position: "absolute",
              top: theme.measure(2),
              left: theme.measure(2),
              borderRadius:theme.measure(3)
            },theme.styles.dropShadow ]}
            onPress={handleRecordPress}
          >
            <Image
              source={MedicalRecordImage}
              style={[{ height: theme.measure(3), width: theme.measure(3)}]}
              resizeMode='contain'
            />
          </CircleButton>

          {/* Ícones brancos da esquerda */}
          <View
            style={[
              theme.styles.spacedRow,
              {
                position: "absolute",
                top: theme.measure(2),
                right: theme.measure(7),
              },
            ]}
          >
            <CircleButton
              size={theme.measure(3)}
              style={{ marginRight: theme.measure(1) }}
            >
              <Image
                source={HelpImage}
                style={{ height: theme.measure(2), width: theme.measure(2) }}
                resizeMode='contain'
              />
            </CircleButton>
            <CircleButton
              size={theme.measure(3)}
              style={{ marginRight: theme.measure(1) }}
              onPress={handleMenu}
            >
              <Image
                source={HomeImage}
                style={{ height: theme.measure(2), width: theme.measure(2) }}
                resizeMode='contain'
              />
            </CircleButton>
            <CircleButton size={theme.measure(3)} onPress={handleConfiguration}>
              <Image
                source={CogImage}
                style={{ height: theme.measure(2), width: theme.measure(2) }}
                resizeMode='contain'
              />
            </CircleButton>
          </View>

          {/* Barra de pontuação */}
          <View
            style={[
              theme.styles.dropShadow,
              theme.styles.scoreBar,
              { shadowOffset: { width: 0, height: 10 } },
            ]}
          >
            <Animated.View
              style={{
                shadowOffset: { width: 10, height: 10 },
                elevation: 10,
                height: !scores[etapa.key]?.score
                  ? 0
                  : scoreAnim.interpolate({
                      inputRange: [0, scores[etapa.key].maxScore],
                      outputRange: ["0%", "100%"],
                      extrapolate: "clamp",
                    }),
                backgroundColor: appColors.activeStep,
              }}
            />
          </View>

          {/* Caixa de feedback do paciente e resultado de exames */}
          {feedbackContent.visible && (
            <View
              style={[
                theme.styles.dropShadow,
                theme.styles.feedbackBox,
                {
                  backgroundColor: feedbackContent.isSpeech
                    ? "#ACDCCE"
                    : appColors.cardGray,
                },
              ]}
            >
              <Typography>{feedbackContent.text}</Typography>
            </View>
          )}

          {/* Caixa de fala e pensamento do jogador */}
          <SpeechThink
            arrowBlink={
              (speechControl.pagination === 0 &&
                !speechControl.enableOptions) ||
              (etapa.index === 3 && gameData.selections.diagnostico)
            }
            isSpeech={isSpeech}
            onArrowClick={handlePaginationPress}
            onOptionPress={handleOptionPress(
              options.perPage * options.pagination,
            )}
            options={options.options?.slice(
              options.perPage * options.pagination,
              options.perPage * (1 + options.pagination),
            )}
            // showArrow={(etapa.index !== 3 || gameData.selections.diagnostico || !(gameData.selections.diagnostico + speechControl.enableOptions)) && (speechControl.enableOptions && options.options.length <= options.perPage)}
            showArrow={
              options.options.length > options.perPage ||
              !speechControl.enableOptions ||
              (etapa.index === 3 && gameData.selections.diagnostico)
            }
            showText={!speechControl.enableOptions}
            text={
              gameplayScreenplay.etapas[etapa.index].falas[
                speechControl.pagination
              ].text
            }
          />

          {/* Imagem do médico */}
          <View
            style={[
              theme.styles.dropShadow,
              theme.styles.GameScreenAvatarContainer,
              { borderRadius: theme.measure(1) },
            ]}
          >
            <View
              style={[
                {
                  position: "relative",
                },
              ]}
            >
              <Image source={avatar} style={[theme.styles.GameScreenAvatar]} />
              {!isSpeech && (
                <Image
                  source={ThinkCircles}
                  style={[theme.styles.GameScreenThinkCircles]}
                />
              )}
            </View>
          </View>

          <View
            style={[
              theme.styles.spacedRow,
              {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: "flex-end",
              },
            ]}
          >
            <StepButton
              style={[{ flexGrow: 1 }]}
              title={"Anamnese"}
              step={1}
              currentStep={etapa.index}
              onPress={handleNextStep}
            />
            <StepButton
              style={{ flexGrow: 1 }}
              title={"Exame Clínico"}
              step={2}
              currentStep={etapa.index}
              onPress={handleNextStep}
            />
            <StepButton
              style={{ flexGrow: 1 }}
              title={"Exames Complementares"}
              step={4}
              currentStep={etapa.index}
              onPress={handleNextStep}
            />
            <StepButton
              style={{ flexGrow: 1 }}
              title={"Diagnóstico"}
              step={5}
              currentStep={etapa.index}
              onPress={handleNextStep}
            />
            <StepButton
              style={{ flexGrow: 1 }}
              title={"Conduta"}
              step={6}
              currentStep={etapa.index}
              onPress={handleNextStep}
            />
            <StepButton
              style={{ flexGrow: 1 }}
              title={"Comunicação"}
              step={7}
              currentStep={etapa.index}
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
};
