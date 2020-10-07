import React from 'react';
import { Modal as RNModal, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { Grid } from './Grid';
import { CloseIcon } from '../assets/icons';

export const Modal = ({ children, onConfirm, onCancel, visible, message, ...props }) => {
  return (
    <RNModal
      animationType='fade'
      visible={visible}
      transparent
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        {children}
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000000D3',
    borderWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 510,
    position: 'relative',
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});