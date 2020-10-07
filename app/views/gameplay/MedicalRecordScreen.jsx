import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, appColors } from '../../styles';
import { CaseCard } from '../../components/CaseCard';
import { Cases } from '../../services/firestore';
import { CloseIcon, ArrowIcon } from '../../assets/icons';
import { Typography } from '../../components/Typography';

const pages = [
  {
    dataKey: null,
    label: 'PRONTUÁRIO'
  },
  {
    dataKey: null,
    label: 'Informações do paciente'
  },
  {
    dataKey: null,
    label: 'Histórico de doenças'
  },
  {
    dataKey: 'anamnese',
    label: 'Anamnese'
  },
  {
    dataKey: 'exame_clinico',
    label: 'Exame Clínico'
  },
  {
    dataKey: 'exame_complementar',
    label: 'Exames Complementares'
  },
  {
    dataKey: 'diagnostico',
    label: 'Diagnóstico'
  },
  {
    dataKey: 'tratamento',
    label: 'Conduta/Tratamento'
  }
]

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
    <View style={[styles.container, { backgroundColor: '#00968A' }]}>
      <View style={[styles.spacedRow, { flex: 1, alignItems: 'stretch' }]}>

        <View style={{ backgroundColor: '#A9E1DE', padding: 30, borderRadius: 15, flexGrow: 1, flexShrink: 1 }}>
          <Typography bold variant="header34" style={{ marginBottom: 30 }}>{pages[paginationIndex].label}</Typography>
          {paginationIndex === 0 && (
            <View style={{ flexGrow: 1, justifyContent: 'space-between' }}>
              {pages.slice(1, pages.length).map((page, index) => (
                <TouchableOpacity activeOpacity={0.9} onPress={() => setPaginationIndex(index + 1)}>
                  <Typography bold variant="header34">{page.label}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {paginationIndex >= 3 && (
            <ScrollView contentContainerStyle={{ flexShrink: 1, overflow: "scroll" }}>
              {paginationIndex === 6 ? (
                <>
                  <Typography paragraph variant="header24">{`Diagnóstico inicial: ${data[pages[6].dataKey].aux.initialDiagnosis?.texto || '---'}`}</Typography>
                  <Typography paragraph variant="header24">{`Diagnóstico final: ${data[pages[6].dataKey].aux.finalDiagnosis?.texto || '---'}`}</Typography>
                </>
              ) : (
                  data[pages[paginationIndex].dataKey].options.filter(op => op.checked).map((op, index) => (
                    <Typography paragraph variant="header24" key={index}>{`• ${op.prontuario}`}</Typography>
                  ))
                )}
            </ScrollView>
          )}
        </View>

        <View style={{ alignItems: 'stretch', justifyContent: 'space-between', width: 285, marginLeft: 45 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleBack}>
              <CloseIcon color={'#025850'} height={30} width={30} />
            </TouchableOpacity>
          </View>

          {paginationIndex >= 3 && (
            <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
              <Typography bold variant="header34" color='#fff' style={{ textAlign: 'center' }}>{pages[paginationIndex].label}</Typography>
              <Typography paragraph variant="header20" color='#fff'>Pontuação</Typography>
              <Typography paragraph variant="header34" color='#fff'>{data[pages[paginationIndex].dataKey].score.toLocaleString('pt-br')}</Typography>
            </View>
          )}

          <View style={{ alignItems: 'center', marginBottom: 105 }}>
            <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
              <ArrowIcon color='#fff' width={60} height={90} />
            </TouchableOpacity >
          </View>
        </View>
      </View>
    </View>
  );
}