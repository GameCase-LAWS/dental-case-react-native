import React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Grid } from '../../components/Grid';
import { Container } from '../../components/Container';
import { meansure } from '../../tools/resolution';
import { Modal } from '../../components/Modal';

const Column = ({ color, fill, label }) => {
  return (
    <View style={{ flexGrow: 1, flexBasis: 0.16, justifyContent: 'flex-end', alignItems: 'center' }}>
      <Typography variant='header20' style={{ textAlign: 'center' }}>{Math.floor(100 * fill)}%</Typography>
      <View style={{ width: '60%', backgroundColor: color, height: 300 * fill }} />
      <Typography variant="overline10" bold style={{ textAlign: 'center', flexShrink: 1, position: 'absolute', bottom: -60 }} numberOfLines={2}>{label}</Typography>
    </View>
  );
}

export const EndingScreen = ({ route, navigation, ...props }) => {
  if (route && route.params) {
    const { caso, data } = route.params;
  }
  const [isShowingGraphic, setShowingGraphic] = React.useState(false);
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null
  });
  
  const pass = () => { };

  const modalComponent = (
    <Modal
      visible={modal.visible}
      onClose={() => setModal({ visible: false, modal: null })}
    >
      {modal.modal}
    </Modal>
  );

  return (
    <Container
      containerStyle={{ backgroundColor: '#D9DBD5' }}
      style={{ flex: 1, paddingVertical: meansure(3), backgroundColor: 'tomato' }}
      overflowChildren={modalComponent}
    >
      <Typography bold variant="header24" style={{ textAlign: 'center', marginBottom: meansure(1), height: meansure(4), backgroundColor: 'pink' }}>Fim do atendimento!</Typography>
      <Grid container spacingX={meansure(3)} style={{ flexGrow: 1, backgroundColor: 'red' }}>
        <Grid item size={6} style={{ backgroundColor: 'blue' }}>
          <View style={{ marginLeft: meansure(4) }}>
            <Typography bold variant="header34" style={{ textAlign: 'center', height: meansure(2) }}>Desempenho médio</Typography>
            <Typography bold variant="header48" style={{ textAlign: 'center', height: meansure(3) }}>89.66%</Typography>
            <View style={{ justifyContent: 'space-between', flexGrow: 1, height: meansure(19), marginTop: meansure(1) }}>
              <Button onPress={pass} label='Detalhes do atendimento' style={styles.button} />
              <Button onPress={pass} label='Refazer o atendimento' style={styles.button} />
              <Button onPress={pass} label='Novo paciente' style={styles.button} />
              <Button onPress={pass} label='Histórico' style={styles.button} />
            </View>
          </View>
        </Grid>
        <Grid item size={6}>
          <View style={{ backgroundColor: 'white', height: 450 }}>
            <View style={{ flexDirection: 'row', height: 450 }}>
              <Column color='#97BED6' fill={0.41} label='Anamnese' />
              <Column color='#AFAFAD' fill={0.18} label='Exame Clínico' />
              <Column color='#D55960' fill={0.53} label='Exames Complementares' />
              <Column color='#86BD7C' fill={0.78} label='Diagnóstico' />
              <Column color='#FBD174' fill={0.93} label='Conduta' />
              <Column color='#ACA0BE' fill={0.95} label='Comunicação' />
            </View>
          </View>
        </Grid>
      </Grid>
    </Container>
  );
}