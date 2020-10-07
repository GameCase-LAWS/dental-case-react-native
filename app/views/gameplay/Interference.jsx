import React from 'react';
import { View } from 'react-native';
import { styles, appColors } from '../styles';
import { CaseCard } from '../components/CaseCard';
import { Cases } from '../services/firestore';

export const HomeScreen = (props) => {
  const [loadedCases, setLoadedCases] = React.useState(null);
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  React.useEffect(() => {
    async function loadCasesAsync() {
      const cases = Cases.show();
      setLoadedCases();
    }

    loadCasesAsync();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: appColors.backgroundBlue }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {loadedCases && loadedCases
          .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
        }
        {/* .map((case) => <CaseCard title={case.titulo} />)} */}
      </View>
      {loadedCases && loadedCases.length > 3 && <View />}
    </View>
  );
}