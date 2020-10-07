import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles, appColors } from '../../styles';
import { Typography } from '../../components/Typography';
import { CloseIcon } from '../../assets/icons';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';

export const AlertScreen = ({message, onCancel, onConfirm, ...props}) => {
  React.useEffect(() => {
    async function loadCasesAsync() {
      const cases = Cases.show();
      setLoadedCases();
    }

    loadCasesAsync();
  }, []);

  return (
    <View style={styles.modalView}>
      <TouchableOpacity activeOpacity={0.9} style={{ position: 'absolute', right: 15, top: 15 }} onPress={onCancel}>
        <CloseIcon width={20} height={20} color='#000' />
      </TouchableOpacity>
      <Typography variant="header24" style={{ textAlign: 'center' }}>{message}</Typography>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginHorizontal: 30 }}>
        <Button label={'Sim'} style={{ width: 165 }} onPress={onConfirm} />
        <Button label={'Não'} style={{ width: 165 }} onPress={onCancel} />
      </View>
    </View>
  );
}