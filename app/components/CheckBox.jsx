import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from './Typography';

import Checked from '../assets/images/checked.png';
import { measure } from '../tools/resolution';

export const CheckBox = ({ onPress, label, style, checked, ...props }) => {
  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <TouchableOpacity activeOpacity={0.9} disabled={checked} onPress={onPress}>
        <View style={styles.checkbox}>
          {checked && <Image source={Checked} resizeMode="contain" style={styles.checkIcon} />}
        </View>
      </TouchableOpacity>
      <Typography numberOfLines={2} style={{ paddingTop: 5 }}>{label}</Typography>
    </View>
  );
}

CheckBox.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool
}

CheckBox.defaultProps = {
  onPress: () => { },
  checked: false
}

const styles = StyleSheet.create({
  checkIcon: {
    height: measure(1),
    width: measure(1)
  },
  checkbox: {
    width: measure(3),
    height: measure(2),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: measure(1) * 2 / 3,
    marginRight: measure(1)
  }
});