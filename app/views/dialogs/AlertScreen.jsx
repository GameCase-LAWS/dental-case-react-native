import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../styles';
import { Typography } from '../../components/Typography';
import { CloseIcon } from '../../assets/icons';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';
import { ThemeContext } from '../../ThemeContext';

export const AlertScreen = ({ message, onCancel, onConfirm, onClose, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  function handleClose() {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  }

  return (
    <View style={theme.styles.AlertScreen_modalView}>
      <TouchableOpacity activeOpacity={0.9} style={theme.styles.AlertScreen_closeBtn} onPress={onClose}>
        <CloseIcon width={theme.measure(2)} height={theme.measure(2)} color='#000' />
      </TouchableOpacity>
      <Typography bold variant="header34" style={{ textAlign: 'center' }}>{message}</Typography>
      <View style={theme.styles.AlertScreen_btnContainer}>
        <Button label={'Sim'} style={theme.styles.AlertScreen_btn} onPress={onConfirm} />
        <Button label={'Não'} style={theme.styles.AlertScreen_btn} onPress={handleClose} />
      </View>
    </View>
  );
}
