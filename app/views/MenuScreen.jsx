import React from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import { appColors } from '../styles';
import { CaseCard } from '../components/CaseCard';
import { Cases } from '../services/firestore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { StepButton } from '../components/StepButton';
import { LocalStorage, localStorageKeys } from '../services/localStorage';
import { Grid } from '../components/Grid';
import { Container } from '../components/Container';
import { ArrowIcon, CreditsIcon } from '../assets/icons';
import { CircleButton } from '../components/CircleButton';
import { findObjectInListByTag } from '../tools/functions';
import { ConfigurationScreen } from './dialogs/ConfigurationScreen';
import { Modal } from '../components/Modal';
import { AlertScreen } from './dialogs/AlertScreen';
import { ThemeContext } from '../ThemeContext';

const CogSource = require('../assets/images/cog.png');
const LogoutSource = require('../assets/images/logout.png');

export const MenuScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const [loadedCases, setLoadedCases] = React.useState(null);
  const [paginationIndex, setPaginationIndex] = React.useState(0);
  const [modal, setModal] = React.useState({
    visible: false,
    modal: null
  });
  const [cards, setCards] = React.useState();

  React.useEffect(() => {
    async function loadCasesAsync() {
      await Cases.index()
        .then(docs => {
          setLoadedCases(docs);
          setCards(docs.map(c => <CaseCard title={c.titulo} onPress={handleGameStart(c)} image={findObjectInListByTag(c.imagens, 'identificador', 'card-header').arquivo} />));
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

  const handlePagination = () => setPaginationIndex(old => old === Math.ceil(loadedCases.length / 3) - 1 ? 0 : ++old);

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
      style={{ paddingHorizontal: theme.measure(4), paddingVertical: theme.measure(3) }}
      containerStyle={{ backgroundColor: appColors.backgroundBlue }}
      overflowChildren={modalComponent}
    >
      {/* <View style={[theme.styles.container, { backgroundColor: appColors.backgroundBlue }]}> */}
      <View style={theme.styles.spacedRow}>
        <View style={theme.styles.topLeftGrayContainer}>
          <Typography variant="header20">Escolha seu jogo</Typography>
        </View>
        <Button label="Histórico" buttonStyle={{ width: theme.measure(9), height: theme.measure(4) }} onPress={() => navigation.navigate('History')} />
      </View>

      <View style={{ justifyContent: 'center', flexGrow: 1 }}>
        <View style={[theme.styles.spacedRow, { alignItems: 'stretch' }]}>
          <Grid container spacingX={theme.measure(2)}>
            {cards && cards
              .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
              .map((c, i) => <Grid item size={4} key={i}>{c}</Grid>)
            }
          </Grid>
          <View style={theme.styles.center}>
            {loadedCases && loadedCases.length > 3 && (
              <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
                <ArrowIcon color='#fff' height={theme.measure(6)} width={theme.measure(4)} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <CircleButton
          size={theme.measure(3)}
          style={{ marginRight: theme.measure(1) }}
          label='Créditos'
          containerStyle={theme.styles.circlePadding}
          onPress={() => navigation.navigate('Credits')}
        >
          <CreditsIcon height={theme.measure(1.5)} width={theme.measure(1.5)} />
        </CircleButton>
        <CircleButton
          size={theme.measure(3)}
          style={{ marginRight: theme.measure(1) }}
          label='Configurações'
          containerStyle={theme.styles.circlePadding}
          onPress={handleConfiguration}
        >
          <Image source={CogSource} style={{ width: theme.measure(1.5), height: theme.measure(1.5) }} />
        </CircleButton>
        <CircleButton
          size={theme.measure(3)}
          label='Desconectar'
          containerStyle={theme.styles.circlePadding}
          onPress={handleDisconnect}
        >
          <Image source={LogoutSource} style={{ width: theme.measure(1.5), height: theme.measure(1.5) }} />
        </CircleButton>
      </View>
    </Container>
  );
}