import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../styles';
import { Typography } from '../../components/Typography';
import { CloseIcon } from '../../assets/icons';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';
import { meansure } from '../../tools/resolution';

export const AlertScreen = ({ message, onCancel, onConfirm, onClose, ...props }) => {
  function handleClose() {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  }

  return (
    <View style={styles.modalView}>
      <TouchableOpacity activeOpacity={0.9} style={styles.closeBtn} onPress={onClose}>
        <CloseIcon width={meansure(1.5)} height={meansure(1.5)} color='#000' />
      </TouchableOpacity>
      <Typography variant="header24" style={{ textAlign: 'center' }}>{message}</Typography>
      <View style={styles.btnContainer}>
        <Button label={'Sim'} style={styles.btn} onPress={onConfirm} />
        <Button label={'Não'} style={styles.btn} onPress={handleClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: meansure(34),
    borderRadius: meansure(2),
    paddingVertical: meansure(2),
    paddingHorizontal: meansure(3),

    position: 'relative',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeBtn: {
    position: 'absolute',
    right: meansure(2),
    top: meansure(2)
  },
  btn: {
    width: meansure(11)
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: meansure(2),
    marginHorizontal: meansure(2)
  }
});