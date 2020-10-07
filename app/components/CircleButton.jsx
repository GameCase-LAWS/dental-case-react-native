import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const CircleButton = ({
  size,
  onPress,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.container, style, { width: size, height: size, borderRadius: size }]} {...props}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func
}

CircleButton.defaultTypes = {
  size: 75,
  onPress: () => { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});