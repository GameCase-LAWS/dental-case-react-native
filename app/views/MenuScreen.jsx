import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { styles, appColors, windowWidth } from '../styles';
import { CaseCard } from '../components/CaseCard';
import { Cases } from '../services/firestore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { StepButton } from '../components/StepButton';
import { LocalStorage, localStorageKeys } from '../services/localStorage';
import { Grid } from '../components/Grid';
import { ArrowIcon } from '../assets/icons';

export const MenuScreen = ({ navigation, ...props }) => {
  const [loadedCases, setLoadedCases] = React.useState(null);
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  React.useEffect(() => {
    async function loadCasesAsync() {
      await Cases.show()
        .then(docs => {
          setLoadedCases(docs);
          // setLoadedCases(require('../test/cases.json'));
        })
        .catch(e => {
          Alert.alert("Não foi possível carregar os casos");
          console.error(e);
        });
    }

    loadCasesAsync();
  }, []);

  console.log(loadedCases);

  const handleGameStart = (caso) => () => {
    navigation.navigate("Game", { caso });
  }

  const handlePagination = () => setPaginationIndex(old => old === Math.floor(loadedCases.length / 3) - 1 ? 0 : ++old);

  return (
    <View style={[styles.container, { backgroundColor: appColors.backgroundBlue }]}>
      <View style={styles.spacedRow}>
        <View style={{
          backgroundColor: appColors.cardGray,
          padding: 30,
          borderRadius: 15,
          width: 345,
          height: 75
        }}>
          <Typography bold>Escolha seu jogo</Typography>
        </View>
        <View>
          <Button label="Histórico" style={{ paddingHorizontal: 16 }} onPress={() => console.log(3)} />
        </View>
      </View>
      <View style={[styles.spacedRow, { alignItems: 'stretch', marginTop: 90 }]}>
        <Grid container spacingX={20} style={{ width: windowWidth - 240 }}>
          {loadedCases && loadedCases
            .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
            .map((c, i) =>
              <Grid item size={4} key={i}>
                <CaseCard title={c.titulo} onPress={handleGameStart(c)} />
              </Grid>
            )
          }
        </Grid>
        <View style={styles.center}>
          {loadedCases && loadedCases.length > 3 && (
            <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
              <ArrowIcon color='#fff' height={90} width={60} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}