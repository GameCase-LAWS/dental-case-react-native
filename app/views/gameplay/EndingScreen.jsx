import React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles';
import { Typography } from '../../components/Typography';

export const EndingScreen = ({ route, navigation, ...props }) => {
  const { caso, data } = route.params;
  const [isShowingGraphic, setShowingGraphic] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <Typography variant="header24">Fim do atendimento!</Typography>
    </View>
  );
}