import React from 'react';
import {
  Modal as RNModal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { Grid } from './Grid';
import { CloseIcon } from '../assets/icons';

export const Modal = ({ children, onClose, visible, ...props }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  function close() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) {
        onClose();
      }
    });
  }

  function show() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (Platform.OS === 'web') {
    if (!visible) {
      return null;
    }
    show();

    return (
      <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
        {React.cloneElement(children, { onClose: close })}
      </Animated.View>
    );
  }

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}
      statusBarTranslucent={true}
    >
      <View style={styles.modal}>
        {children}
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000000D3',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center"
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