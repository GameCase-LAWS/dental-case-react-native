import React from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import { styles, appColors, windowWidth } from '../styles';
import { CaseCard } from '../components/CaseCard';
import { Cases } from '../services/firestore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { StepButton } from '../components/StepButton';
import { LocalStorage, localStorageKeys } from '../services/localStorage';
import { Grid } from '../components/Grid';
import { Container } from '../components/Container';
import { ArrowIcon, CreditsIcon } from '../assets/icons';
import { measure } from '../tools/resolution';
import { CircleButton } from '../components/CircleButton';
import { findObjectInListByTag } from '../tools/functions';
import { ConfigurationScreen } from './dialogs/ConfigurationScreen';
import { Modal } from '../components/Modal';
import { AlertScreen } from './dialogs/AlertScreen';

const CogSource = require('../assets/images/cog.png');
const LogoutSource = require('../assets/images/logout.png');

export const MenuScreen = ({ navigation, ...props }) => {
  const [loadedCases, setLoadedCases] = React.useState(null);
  const [paginationIndex, setPaginationIndex] = React.useState(0);
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null
  });
  const [cards, setCards] = React.useState();

  React.useEffect(() => {
    async function loadCasesAsync() {
      await Cases.show()
        .then(docs => {
          setLoadedCases(docs);
          setCards(docs.map(c => <CaseHistory title={c.titulo} onPress={handleGameStart(c)} image={findObjectInListByTag(c.imagens, 'identificador', 'card-header').arquivo} />));
          // setLoadedCases(require('../test/cases.json'));
        })
        .catch(e => {
          Alert.alert("Não foi possível carregar os casos");
          console.error(e);
        });
    }

    loadCasesAsync();
  }, []);

  const handleGameStart = (caso) => () => {
    navigation.navigate("Game", {
      screen: "Avatar",
      params: { caso }
    });
  }

  const handlePagination = () => setPaginationIndex(old => old === Math.floor(loadedCases.length / 3) ? 0 : ++old);

  function handleDisconnect() {
    setModal({
      visible: true,
      modal: (
        <AlertScreen
          message={'Você realmente deseja se desconectar?'}
          onConfirm={() => {
            navigation.goBack()
          }}
        />
      )
    });
  }

  function handleConfiguration() {
    setModal({
      visible: true,
      modal: <ConfigurationScreen />
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

  return (
    <Container
      style={{ paddingHorizontal: measure(4), paddingVertical: measure(3) }}
      containerStyle={{ backgroundColor: appColors.backgroundBlue }}
      overflowChildren={modalComponent}
    >
      {/* <View style={[styles.container, { backgroundColor: appColors.backgroundBlue }]}> */}
      <View style={styles.spacedRow}>
        <View style={styles.topLeftGrayContainer}>
          <Typography variant="header20">Escolha seu jogo</Typography>
        </View>
        <Button label="Histórico" buttonStyle={{ width: measure(9), height: measure(4) }} onPress={() => console.log(3)} />
      </View>

      <View style={{ justifyContent: 'center', flexGrow: 1 }}>
        <View style={[styles.spacedRow, { alignItems: 'stretch' }]}>
          <Grid container spacingX={measure(2)}>
            {cards && cards
              .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
              .map((c, i) => <Grid item size={4} key={i}>{c}</Grid>)
            }
          </Grid>
          <View style={styles.center}>
            {loadedCases && loadedCases.length > 3 && (
              <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
                <ArrowIcon color='#fff' height={measure(6)} width={measure(4)} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <CircleButton
          size={measure(3)}
          style={{ marginRight: measure(1) }}
          label='Créditos'
          containerStyle={styles.circlePadding}
          onPress={() => navigation.navigate('Credits')}
        >
          <CreditsIcon height={measure(1.5)} width={measure(1.5)} />
        </CircleButton>
        <CircleButton
          size={measure(3)}
          style={{ marginRight: measure(1) }}
          label='Configurações'
          containerStyle={styles.circlePadding}
          onPress={handleConfiguration}
        >
          <Image source={CogSource} style={{ width: measure(1.5), height: measure(1.5) }} />
        </CircleButton>
        <CircleButton
          size={measure(3)}
          label='Desconectar'
          containerStyle={styles.circlePadding}
          onPress={handleDisconnect}
        >
          <Image source={LogoutSource} style={{ width: measure(1.5), height: measure(1.5) }} />
        </CircleButton>
      </View>
    </Container>
  );
}