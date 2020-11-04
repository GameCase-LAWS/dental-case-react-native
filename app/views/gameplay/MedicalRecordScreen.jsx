import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { appColors } from '../../styles';
import { CaseCard } from '../../components/CaseCard';
import { Cases } from '../../services/firestore';
import { CloseIcon, ArrowIcon } from '../../assets/icons';
import { Typography } from '../../components/Typography';
import { Container } from '../../components/Container';
import { ThemeContext } from '../../ThemeContext';

const gameplayScreenplay = require('../../screenplay/gameplay.json');

export const MedicalRecordScreen = ({ route, navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const { data, scores, page } = route.params;
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
    <Container containerStyle={{ backgroundColor: '#00968A' }} style={theme.styles.MedicalRecordScreen_container} >
      <View style={theme.styles.MedicalRecordScreen_panel}>
        <Typography bold variant="header34" style={{ marginBottom: theme.measure(3) }}>PRONTUÁRIO</Typography>
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
            <Typography bold paragraph variant="header34">{gameplayScreenplay.prontuario_paginas[paginationIndex].label}</Typography>
            {paginationIndex === 6
              ? <Typography paragraph variant="header24">{`Hipótese diagnóstica: ${data.selections[gameplayScreenplay.prontuario_paginas[6].dataKey]?.texto || '---'}`}</Typography>
              : (
                data.selections[gameplayScreenplay.prontuario_paginas[paginationIndex].dataKey].map((op, index) =>
                  <Typography paragraph variant="header24" key={index}>{`• ${op.prontuario || op.texto}`}</Typography>
                )
              )
            }
          </ScrollView>
        )}
      </View>

      {/* Coluna direita */}
      <View style={theme.styles.MedicalRecordScreen_rightColumn}>
        {paginationIndex >= 3 && (
          <View style={{ alignItems: 'center' }}>
            <Typography bold variant="header34" color='#fff' style={{ textAlign: 'center' }}>{gameplayScreenplay.prontuario_paginas[paginationIndex].label}</Typography>
            <Typography paragraph variant="header20" color='#fff'>Pontuação</Typography>
            <Typography paragraph variant="header34" color='#fff'>{scores[gameplayScreenplay.prontuario_paginas[paginationIndex].dataKey].score.toLocaleString('pt-br')}</Typography>
          </View>
        )}

        <View style={{ alignItems: 'center', marginBottom: theme.measure(7), marginTop: theme.measure(2) }}>
          <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
            <ArrowIcon color='#fff' width={theme.measure(4)} height={theme.measure(6)} />
          </TouchableOpacity >
        </View>
      </View>

      {/* Botão de fechar */}
      <TouchableOpacity activeOpacity={0.9} onPress={handleBack} style={theme.styles.MedicalRecordScreen_closeBtn}>
        <CloseIcon color={'#025850'} height={theme.measure(2)} width={theme.measure(2)} />
      </TouchableOpacity>
    </Container>
  );
};
