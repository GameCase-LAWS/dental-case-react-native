import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { appColors } from '../../styles';
import { CaseCard } from '../../components/CaseCard';
import { Cases } from '../../services/firestore';
import { CloseIcon, ArrowIcon } from '../../assets/icons';
import { Typography } from '../../components/Typography';
import { Container } from '../../components/Container';
import { measure } from '../../tools/resolution';

const gameplayScreenplay = require('../../screenplay/gameplay.json');

export const MedicalRecordScreen = ({ route, navigation, ...props }) => {
  const { data, page } = route.params;
  const [paginationIndex, setPaginationIndex] = React.useState(page + 2 || 0);

  React.useEffect(() => {
    // async function loadCasesAsync() {
    //   const cases = Cases.show();
    //   setLoadedCases();
    // }

    // loadCasesAsync();
  }, []);

  const handleBack = () => navigation.goBack();
  const handlePagination = () => setPaginationIndex(old => old === 7 ? 0 : ++old);

  return (
    <Container containerStyle={{ backgroundColor: '#00968A' }} style={styles.container} >
      <View style={styles.panel}>
        <Typography bold variant="header34" style={{ marginBottom: 30 }}>{gameplayScreenplay.prontuario_paginas[paginationIndex].label}</Typography>
        {paginationIndex === 0 && (
          <View style={{ flexGrow: 1, justifyContent: 'space-between' }}>
            {gameplayScreenplay.prontuario_paginas.slice(1, gameplayScreenplay.prontuario_paginas.length).map((page, index) => (
              <TouchableOpacity activeOpacity={0.9} onPress={() => setPaginationIndex(index + 1)} key={index}>
                <Typography bold variant="header34">{page.label}</Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {paginationIndex >= 3 && (
          <ScrollView contentContainerStyle={{ flexShrink: 1, overflow: "scroll" }}>
            {paginationIndex === 6 ? (
              <Typography paragraph variant="header24">{`Hipótese diagnóstica: ${data[gameplayScreenplay.prontuario_paginas[6].dataKey].aux.finalDiagnosis?.texto || '---'}`}</Typography>
            ) : (
                data[gameplayScreenplay.prontuario_paginas[paginationIndex].dataKey].options.filter(op => op.checked).map((op, index) => (
                  <Typography paragraph variant="header24" key={index}>{`• ${op.prontuario}`}</Typography>
                ))
              )}
          </ScrollView>
        )}
      </View>

      {/* Coluna direita */}
      <View style={styles.rightColumn}>
        <View style={{ alignItems: 'center' }}>
          {paginationIndex >= 3 && (
            <>
              <Typography bold variant="header34" color='#fff' style={{ textAlign: 'center' }}>{gameplayScreenplay.prontuario_paginas[paginationIndex].label}</Typography>
              <Typography paragraph variant="header20" color='#fff'>Pontuação</Typography>
              <Typography paragraph variant="header34" color='#fff'>{data[gameplayScreenplay.prontuario_paginas[paginationIndex].dataKey].score.toLocaleString('pt-br')}</Typography>
            </>
          )}
        </View>

        <View style={{ alignItems: 'center', marginBottom: measure(7) }}>
          <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
            <ArrowIcon color='#fff' width={measure(4)} height={measure(6)} />
          </TouchableOpacity >
        </View>
      </View>

      {/* Botão de fechar */}
      <TouchableOpacity activeOpacity={0.9} onPress={handleBack} style={styles.closeBtn}>
        <CloseIcon color={'#025850'} height={measure(2)} width={measure(2)} />
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: measure(2),
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  panel: {
    backgroundColor: '#A9E1DE',
    padding: measure(2),
    borderRadius: measure(2),
    width: measure(43)
  },
  closeBtn: {
    position: 'absolute',
    top: measure(2),
    right: measure(2)
  },
  rightColumn: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: measure(2)
  }
});