import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Grid } from '../../components/Grid';
import { Container } from '../../components/Container';
import { Modal } from '../../components/Modal';
import { ThemeContext } from '../../ThemeContext';
import { UserContext } from '../../UserContext';
import { findObjectInListByTag } from '../../tools/functions';
import { StackActions, CommonActions } from '@react-navigation/native'
import { Attendance } from '../../services/firestore';
import { appColors } from '../../styles';
import { CloseIcon } from '../../assets/icons';
import { CircleButton } from '../../components/CircleButton';
import { ConfigurationScreen } from "../dialogs/ConfigurationScreen";

const CogImage = require('../../assets/images/cog.png');
const HomeImage = require('../../assets/images/home.png');

const Column = ({ color, fill, onPress, label, height, mb }) => {
  const beautifulFill = fill > 1 ? 1 : (fill < 0 ? 0 : fill);

  const typographyStyle = {
    position: 'absolute',
    textAlign: 'center',
    flexShrink: 1,
    bottom: mb * 1.25,
    height: -mb
  };

  return (
    <View style={{ flexGrow: 1, flexBasis: 0.16, justifyContent: 'flex-end', alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <Typography variant='header20' style={{ textAlign: 'center' }}>{Math.floor(100 * beautifulFill)}%</Typography>
        <View style={{ width: '60%', backgroundColor: color, height: height * beautifulFill }} />
      </TouchableOpacity>
      <Typography variant="overline10" bold style={typographyStyle} numberOfLines={2}>{label}</Typography>
    </View>
  );
}

const FeedbackModal = ({ width, height, padding, children, onClose, closeBtnSize, closeBtnStyle, ...props }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }

  return (
    <View style={{ width, height, padding, backgroundColor: 'white' }} {...props}>
      <TouchableOpacity activeOpacity={0.9} style={closeBtnStyle} onPress={handleClose}>
        <CloseIcon color={appColors.primary} height={closeBtnSize} width={closeBtnSize} />
      </TouchableOpacity>

      <Typography bold paragraph variant="header24" color={appColors.primary} style={{ textAlign: 'center' }}>Feedback da Etapa</Typography>
      <ScrollView contentContainerStyle={{ flexShrink: 1, overflow: "scroll" }}>
        {children}
      </ScrollView>
    </View>
  );
}

export const EndingScreen = ({ route, navigation, ...props }) => {
  const { user } = React.useContext(UserContext);
  const { theme } = React.useContext(ThemeContext);
  const { caso, scores, data } = route.params;

  const [isShowingGraphic, setShowingGraphic] = React.useState(false);
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null
  });

  React.useEffect(() => {
    // const resetAction = CommonActions.reset({
    //   index: 0,
    //   routes: [
    //     { name: 'Game' }
    //   ]
    // });
    // navigation.dispatch(resetAction);

    Attendance.store(data, scores, user?.uid, caso).catch(e => {
      console.error(e.message);
    });
  }, []);

  function handleAttendanceDetails() {
    setShowingGraphic(old => !old);
  }

  function handleRedoAttendance() {
    const popAction = StackActions.popToTop();
    navigation.dispatch(popAction);
  }

  function handleNewPatient() {
    navigation.navigate('Menu');
  }

  function handleAccessHistory() {
    navigation.navigate('History');
  }

  function handleConfiguration() {
    setModal({
      visible: true,
      modal: <ConfigurationScreen />
    });
  }

  const handleModalClose = () => {
    setModal({ visible: false });
  }

  const showFeedback = (etapa) => () => {
    setModal({
      visible: true,
      modal: (
        <FeedbackModal
          height={theme.measure(28)}
          width={theme.measure(40)}
          padding={theme.measure(2)}
          onClose={handleModalClose}
          closeBtnSize={theme.measure(1.5)}
          closeBtnStyle={theme.styles.ConfigurationScreen_closeBtn}
        >
          <View>
            {etapa === 'diagnostico'
              ? (
                <View>
                  <Typography bold>{data.selections[etapa].texto}</Typography>
                  <Typography paragraph>{data.selections[etapa].feedback_pedagogico}</Typography>
                  <Typography bold>Referências Bibliográficas</Typography>
                  <Typography paragraph>{data.selections[etapa].referencia_bibliografica}</Typography>
                </View>
              )
              : (
                data.selections[etapa === 'comunicacao' ? 'anamnese' : etapa].map((e, k) => (
                  <View key={k}>
                    <Typography bold>{e.texto}</Typography>
                    <Typography paragraph>{e.feedback_pedagogico}</Typography>
                    <Typography bold>Referências Bibliográficas</Typography>
                    <Typography paragraph>{e.referencia_bibliografica}</Typography>
                  </View>
                ))
              )
            }
          </View>
        </FeedbackModal>
      )
    });
  }

  const modalComponent = (
    <Modal
      visible={modal.visible}
      onClose={() => setModal({ visible: false, modal: null })}
    >
      {modal.modal}
    </Modal>
  );

  const columnHeight = theme.measure(21);
  const marginBottom = -theme.measure(2);

  return (
    <Container
      containerStyle={{ backgroundColor: '#D9DBD5' }}
      style={{ paddingVertical: theme.measure(3) }}
      overflowChildren={modalComponent}
    >
      {/* Title */}
      <Typography bold variant={isShowingGraphic ? "header24" : "header34"} style={{ textAlign: 'center', marginBottom: theme.measure(1), height: theme.measure(4) }}>
        {isShowingGraphic ? 'Clique nas barras para feedback\ndo atendimento' : 'Fim do atendimento!'}
      </Typography>

      {/* Options */}
      <View style={[theme.styles.spacedRow, { position: 'absolute', top: theme.measure(2), right: theme.measure(7) }]}>
        <CircleButton size={theme.measure(3)} style={{ marginRight: theme.measure(1) }} onPress={handleNewPatient}>
          <Image source={HomeImage} style={{ height: theme.measure(2), width: theme.measure(2) }} resizeMode='contain' />
        </CircleButton>
        <CircleButton size={theme.measure(3)} onPress={handleConfiguration}>
          <Image source={CogImage} style={{ height: theme.measure(2), width: theme.measure(2) }} resizeMode='contain' />
        </CircleButton>
      </View>

      {/* Content */}
      <Grid container spacingX={theme.measure(3)} style={{ flexGrow: 1 }}>
        <Grid item size={6}>
          <View style={{ marginHorizontal: theme.measure(4) }}>
            <Typography bold variant="header34" style={{ textAlign: 'center', height: theme.measure(2) }}>Desempenho médio</Typography>
            <Typography bold variant="header48" style={{ textAlign: 'center', height: theme.measure(3) }}>{Object.values(scores).map(s => s.score).reduce((prev, curr) => prev + curr, 0).toLocaleString('pt-br')}</Typography>

            <View style={{ justifyContent: 'space-between', flexGrow: 1, height: theme.measure(19), marginTop: theme.measure(1) }}>
              <Button onPress={handleAttendanceDetails} label='Detalhes do atendimento' buttonStyle={theme.styles.button} />
              <Button onPress={handleRedoAttendance} label='Refazer o atendimento' buttonStyle={theme.styles.button} />
              <Button onPress={handleNewPatient} label='Novo paciente' buttonStyle={theme.styles.button} />
              <Button onPress={handleAccessHistory} label='Histórico' buttonStyle={theme.styles.button} />
            </View>
          </View>
        </Grid>
        <Grid item size={6}>
          {isShowingGraphic
            ? (
              <View style={{ backgroundColor: 'white', width: theme.measure(30), height: theme.measure(23), justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Column color='#97BED6' onPress={showFeedback('anamnese')} fill={scores.anamnese.score / scores.anamnese.maxScore} label='Anamnese' height={columnHeight} mb={marginBottom} />
                  <Column color='#AFAFAD' onPress={showFeedback('exame_clinico')} fill={scores.exame_clinico.score / scores.exame_clinico.maxScore} label='Exame Clínico' height={columnHeight} mb={marginBottom} />
                  <Column color='#D55960' onPress={showFeedback('exame_complementar')} fill={scores.exame_complementar.score / scores.exame_complementar.maxScore} label='Exames Complementares' height={columnHeight} mb={marginBottom} />
                  <Column color='#86BD7C' onPress={showFeedback('diagnostico')} fill={scores.diagnostico.score / scores.diagnostico.maxScore} label='Diagnóstico' height={columnHeight} mb={marginBottom} />
                  <Column color='#FBD174' onPress={showFeedback('tratamento')} fill={scores.tratamento.score / scores.tratamento.maxScore} label='Conduta' height={columnHeight} mb={marginBottom} />
                  <Column color='#ACA0BE' onPress={showFeedback('comunicacao')} fill={scores.comunicacao.score / scores.comunicacao.maxScore} label='Comunicação' height={columnHeight} mb={marginBottom} />
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
                <Typography paragraph variant="header20">{caso.paciente.nome}</Typography>
                <Image
                  source={{ uri: findObjectInListByTag(caso.imagens, 'identificador', 'character-profile').arquivo }}
                  style={{ width: theme.measure(22), height: theme.measure(22) }}
                  resizeMode='contain'
                />
              </View>
            )}

        </Grid>
      </Grid>

      <Modal
        visible={modal.visible}
        onClose={() => setModal({ modal: null, visible: false })}
      >
        {modal.modal}
      </Modal>
    </Container>
  );
}